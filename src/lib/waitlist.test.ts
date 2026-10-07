import { describe, expect, it } from "vitest";
import {
  buildRequest,
  EMAIL_MAX,
  FIELD_ERRORS,
  NAME_MAX,
  normalise,
  OUTCOME_MESSAGES,
  readOutcome,
  submit,
  validate,
  type Signup,
} from "./waitlist";

const signup = (over: Partial<Signup> = {}): Signup => ({
  name: "Maya",
  email: "maya@example.com",
  source: "/birthdays/",
  website: "",
  ...over,
});

const execution = (status: number, body: unknown) => ({
  responseStatusCode: status,
  responseBody: JSON.stringify(body),
});

describe("visitor copy", () => {
  it("asks for a valid email without an example address", () => {
    expect(FIELD_ERRORS.email).toBe("Enter a valid email address.");
    expect(FIELD_ERRORS.name).toBe("Enter your name.");
  });

  it("keeps @ out of every message Cloudflare would obfuscate", () => {
    const copy = [FIELD_ERRORS.name, FIELD_ERRORS.email, ...Object.values(OUTCOME_MESSAGES)].join("\n");
    expect(copy).not.toMatch(/@/);
  });
});

describe("normalise", () => {
  it("trims the name and email", () => {
    expect(normalise(signup({ name: "  Maya ", email: " maya@example.com\n" }))).toMatchObject({
      name: "Maya",
      email: "maya@example.com",
    });
  });

  it("caps the source path", () => {
    expect(normalise(signup({ source: "/" + "x".repeat(100) })).source).toHaveLength(64);
  });
});

describe("validate", () => {
  it("accepts a name and an email", () => {
    expect(validate(signup())).toEqual([]);
  });

  it("refuses an empty or too long name", () => {
    expect(validate(signup({ name: "" }))).toEqual(["name"]);
    expect(validate(signup({ name: "a".repeat(NAME_MAX + 1) }))).toEqual(["name"]);
  });

  it.each(["", "maya", "maya@", "@example.com", "maya@example", "ma ya@example.com"])(
    "refuses %j as an email",
    (email) => {
      expect(validate(signup({ email }))).toEqual(["email"]);
    },
  );

  it("refuses an email longer than the limit", () => {
    expect(validate(signup({ email: "a".repeat(EMAIL_MAX) + "@x.dk" }))).toEqual(["email"]);
  });

  it("reports both fields in form order", () => {
    expect(validate(signup({ name: "", email: "nope" }))).toEqual(["name", "email"]);
  });
});

describe("buildRequest", () => {
  it("posts a synchronous guest execution of waitlist-signup", () => {
    const { url, init } = buildRequest(signup());
    expect(url).toBe("https://app.12f.dk/v1/functions/waitlist-signup/executions");
    expect(init.method).toBe("POST");
    expect(init.headers).toEqual({
      "Content-Type": "application/json",
      "X-Appwrite-Project": "after-stories",
    });
    const outer = JSON.parse(init.body as string);
    expect(outer.async).toBe(false);
    expect(JSON.parse(outer.body)).toEqual(signup());
  });

  it("never sends an API key", () => {
    const { init } = buildRequest(signup());
    expect(JSON.stringify(init.headers).toLowerCase()).not.toContain("key");
  });
});

describe("readOutcome", () => {
  it("is saved on the function's 200 ok", () => {
    expect(readOutcome(201, execution(200, { ok: true }))).toBe("saved");
  });

  it("is invalid on the function's 400", () => {
    expect(readOutcome(201, execution(400, { ok: false, error: "invalid" }))).toBe("invalid");
  });

  it("is rate limited on the function's 429 or Appwrite's", () => {
    expect(readOutcome(201, execution(429, { ok: false, error: "rate_limited" }))).toBe("rate_limited");
    expect(readOutcome(429, null)).toBe("rate_limited");
  });

  it.each([
    ["an Appwrite error", 404, { message: "Function not found" }],
    ["a function crash", 201, execution(500, { ok: false })],
    ["a 200 without ok", 201, execution(200, {})],
    ["a body that isn't JSON", 201, { responseStatusCode: 200, responseBody: "<html>" }],
    ["no body", 201, null],
  ])("fails on %s", (_, status, body) => {
    expect(readOutcome(status as number, body)).toBe("failed");
  });
});

describe("submit", () => {
  it("returns the outcome of the response", async () => {
    const fetcher = async () => new Response(JSON.stringify(execution(200, { ok: true })), { status: 201 });
    expect(await submit(signup(), fetcher as typeof fetch)).toBe("saved");
  });

  it("fails instead of throwing when the network is down", async () => {
    const fetcher = async () => {
      throw new TypeError("Failed to fetch");
    };
    expect(await submit(signup(), fetcher as typeof fetch)).toBe("failed");
  });
});
