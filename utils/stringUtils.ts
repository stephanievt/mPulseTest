import { faker } from "@faker-js/faker";

/**
 * Generates a unique 9-digit tax identification number (EIN format: XX-XXXXXXX).
 */
export function generateTaxId(): string {
  return faker.string.numeric(9);
}

/**
 * Generates a random string of the specified length.
 * @param length - Desired string length (must be positive)
 * @param useLetters - Include alphabetic characters
 * @param useNumbers - Include numeric characters
 * @returns A random string composed of the selected character sets
 */
export function generateRandomString(length: number, useLetters: boolean, useNumbers: boolean): string {
  if (length <= 0) {
    throw new Error("Number of digits must be positive.");
  }

  let chars = "";
  if (useLetters) chars += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (useNumbers) chars += "0123456789";

  if (chars.length === 0) {
    throw new Error("At least one of useLetters or useNumbers must be true.");
  }

  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
