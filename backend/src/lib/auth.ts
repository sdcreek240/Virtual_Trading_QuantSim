import bcrypt from "bcrypt";

/**
 * Hashes a plain-text password using bcrypt.
 * @param password - The plain-text password to hash.
 * @returns A promise resolving to the hashed password string.
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

/**
 * Compares a plain-text password with a hashed password to verify authenticity.
 * @param password - The plain-text password to check.
 * @param hash - The hashed password to compare against.
 * @returns A promise resolving to a boolean indicating whether the password is valid.
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}