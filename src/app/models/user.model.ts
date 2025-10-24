// src/app/models/user.model.ts

export type UserRole = 'admin' | 'user';

export interface User {
  email: string;
  password: string;
  role: 'admin' | 'user';
}
// Model for the decoded JWT payload
export interface JwtPayload {
  sub: number; // User ID
  email: string;
  role: UserRole;
  iat: number; // Issued at
  exp: number; // Expiration time
}

// Model for the response from the login API
export interface AuthResponse {
  token: string; // The JWT token
}
