// utils/urlEmail.ts

// Encode email for safe use in URLs
export function encodeEmail(email: string): string {
  return encodeURIComponent(email);
}

// Decode email from URL back to readable form
export function decodeEmail(encodedEmail: string): string {
  return decodeURIComponent(encodedEmail);
}
