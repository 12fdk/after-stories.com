// "Get notified when we launch": the request to the backend's waitlist-signup function and the
// reading of its answer. The contract is 12fdk/after-stories#271. Kept free of the DOM so it can
// be tested on its own (src/lib/waitlist.test.ts).

export const WAITLIST = {
  endpoint: "https://app.12f.dk/v1",
  project: "after-stories",
  functionId: "waitlist-signup",
} as const;

export const NAME_MAX = 80;
export const EMAIL_MAX = 254;
export const SOURCE_MAX = 64;

export interface Signup {
  name: string;
  email: string;
  source: string;
  /** The honeypot. People never see the field; a value means a bot. */
  website: string;
}

export type FieldError = "name" | "email";

/** Deliberately loose: one @, something on each side, a dot in the domain. The server decides. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalise(input: Signup): Signup {
  return {
    name: input.name.trim(),
    email: input.email.trim(),
    source: input.source.slice(0, SOURCE_MAX),
    website: input.website,
  };
}

/** The fields that are wrong, in form order. Empty when the sign-up can be sent. */
export function validate(input: Signup): FieldError[] {
  const errors: FieldError[] = [];
  if (input.name.length === 0 || input.name.length > NAME_MAX) errors.push("name");
  if (input.email.length > EMAIL_MAX || !EMAIL.test(input.email)) errors.push("email");
  return errors;
}

/** A synchronous Appwrite function execution, sent as a guest. */
export function buildRequest(signup: Signup): { url: string; init: RequestInit } {
  return {
    url: `${WAITLIST.endpoint}/functions/${WAITLIST.functionId}/executions`,
    init: {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Appwrite-Project": WAITLIST.project },
      body: JSON.stringify({ async: false, body: JSON.stringify(signup) }),
    },
  };
}

export type Outcome = "saved" | "invalid" | "rate_limited" | "failed";

/**
 * Copy under the fields and after a failed submit. No example address: Cloudflare's email
 * obfuscation rewrites any HTML string that contains an @, which garbled the old example
 * address on the live page.
 */
export const FIELD_ERRORS = {
  name: "Enter your name.",
  email: "Enter a valid email address.",
} as const;

export const OUTCOME_MESSAGES: Record<Exclude<Outcome, "saved">, string> = {
  invalid: "Check your name and email, then send it again.",
  rate_limited: "Too many sign-ups right now. Try again in a few minutes.",
  failed: "Couldn't save your email. Check your connection and try again.",
};

/**
 * Reads what came back. The HTTP status is Appwrite's (did the execution run); the function's
 * own answer is in responseStatusCode and responseBody.
 */
export function readOutcome(httpStatus: number, execution: unknown): Outcome {
  if (httpStatus < 200 || httpStatus >= 300) return httpStatus === 429 ? "rate_limited" : "failed";
  if (!execution || typeof execution !== "object") return "failed";
  const { responseStatusCode, responseBody } = execution as {
    responseStatusCode?: unknown;
    responseBody?: unknown;
  };
  let body: { ok?: unknown; error?: unknown } = {};
  try {
    body = typeof responseBody === "string" && responseBody ? JSON.parse(responseBody) : {};
  } catch {
    return "failed";
  }
  if (responseStatusCode === 200 && body.ok === true) return "saved";
  if (responseStatusCode === 400 && body.error === "invalid") return "invalid";
  if (responseStatusCode === 429) return "rate_limited";
  return "failed";
}

/** Sends the sign-up and never throws: a network failure is just "failed". */
export async function submit(signup: Signup, fetcher: typeof fetch = fetch): Promise<Outcome> {
  const { url, init } = buildRequest(signup);
  try {
    const response = await fetcher(url, init);
    const execution = await response.json().catch(() => null);
    return readOutcome(response.status, execution);
  } catch {
    return "failed";
  }
}
