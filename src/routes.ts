/**
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = [];
/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to the `/dashboard`
 * @see DEFAULT_LOGIN_REDIRECT
 * @type {string[]}
 */
export const authRoutes: string[] = ["/"];
/**
 * The prefix for the API authentication routes
 * Routes that start with this prefix are used for authentication purposes
 */
export const apiAuthPrefix = "/api/auth";
/**
 * The default route to redirect to after a successful login
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
