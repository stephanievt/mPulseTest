// utils/env.ts

// Allowed values arrays
const ENV_VALUES = ["qa", "uat", "prod"] as const;
const CLIENT_VALUES = ["FHCP", "UUHP", "IHG", "THI", "CHOICE", "EMI", "PHP", "IEHP", "DEMO"] as const;

// Types automatically derived from allowed values
export type Environment = (typeof ENV_VALUES)[number];
export type Client = (typeof CLIENT_VALUES)[number];

/**
 * Safely get an environment variable or throw if invalid/missing.
 */
function getEnvVar<T extends string>(envVar: string | undefined, allowedValues: readonly T[], name: string): T {
  if (envVar && allowedValues.includes(envVar as T)) return envVar as T;

  throw new Error(
    `[ERROR] Invalid or missing environment variable '${name}': '${envVar}'. Allowed values: ${allowedValues.join(", ")}. Set it in your .env file.`,
  );
}

// Export current environment and client
export const ENV: Environment = getEnvVar(process.env.ENV, ENV_VALUES, "ENV");
export const CLIENT: Client = getEnvVar(process.env.CLIENT, CLIENT_VALUES, "CLIENT");

const CREDENTIAL_TYPES = ["CARRIER", "BILLING", "EDI", "COMMISSIONS", "AGENT"] as const;
export type CredentialType = (typeof CREDENTIAL_TYPES)[number];

/**
 * Returns credentials for the given type and current client.
 * Checks client-specific env vars first (e.g. CHOICE_BILLING_USERNAME),
 * then falls back to the default (e.g. BILLING_USERNAME / BILLING_PASSWORD).
 */
export function getCredentials(type: CredentialType = "CARRIER"): { username: string; password: string } {
  const username = process.env[`${CLIENT}_${type}_USERNAME`] || process.env[`${type}_USERNAME`];
  const password = process.env[`${CLIENT}_${type}_PASSWORD`] || process.env[`${type}_PASSWORD`];

  if (!username || !password) {
    throw new Error(
      `Missing ${type} credentials. Set ${type}_USERNAME/${type}_PASSWORD or ${CLIENT}_${type}_USERNAME/${CLIENT}_${type}_PASSWORD in your .env file.`,
    );
  }

  return { username, password };
}
