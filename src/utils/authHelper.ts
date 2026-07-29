import { APIRequestContext } from "@playwright/test";
import { getUrl } from "./urlManager";

export interface AuthResponse {
  success: boolean;
  status: number;
  location?: string;
  csrfToken?: string;
}

/**
 * Authenticates a user via API and returns the authentication response.
 * The session cookies are automatically stored in the context.
 * 
 * @param context - The Playwright APIRequestContext (use context.request from your test)
 * @param loginUrl - The login URL to authenticate against
 * @param username - The username to authenticate with
 * @param password - The password to authenticate with
 * @returns AuthResponse with authentication details
 */
export async function authenticateViaAPI(
  context: APIRequestContext,
  loginUrl: string,
  username: string,
  password: string
): Promise<AuthResponse> {
  // Step 1: Get the login page to obtain CSRF token
  const loginPageResponse = await context.get(loginUrl);
  const loginPageHtml = await loginPageResponse.text();
  
  // Extract CSRF token from the HTML
  const csrfMatch = loginPageHtml.match(/name="_csrf"\s+value="([^"]+)"/);
  const csrfToken = csrfMatch ? csrfMatch[1] : '';
  
  if (!csrfToken) {
    throw new Error("Failed to extract CSRF token from login page");
  }
  
  // Step 2: Authenticate via API with CSRF token
  const response = await context.post(loginUrl, {
    form: {
      'j_username': username,
      'j_password': password,
      '_csrf': csrfToken
    },
    maxRedirects: 0 // Don't follow redirects automatically
  });

  const status = response.status();
  const location = response.headers()['location'];
  
  return {
    success: status === 302 && location?.includes('/dashboard'),
    status,
    location,
    csrfToken
  };
}
