/* Shared authentication types */

// Request payloads
export interface SignUpPayload {
  username: string;
  email: string;
  password: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

// Successful response shape (fields used on the client side)
export interface AuthSuccessResponse {
  success: boolean;
  shortLivedJWT: string;
  refreshToken: string;
  // Optional message returned by the backend (e.g., welcome note)
  message?: string;
}

// Error shape thrown by the service
export interface AuthError {
  status?: number;
  message: string;
}
