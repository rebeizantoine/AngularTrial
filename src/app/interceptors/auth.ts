import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';

export interface JwtPayload {
  sub: number;
  email: string;
  role: 'admin' | 'user';
  iat: number;
  exp: number;
}

export interface AuthResponse {
  token: string;
}

const TOKEN_KEY = 'authToken'; // LocalStorage key for token
const USERS_KEY = 'users'; // LocalStorage key for user list

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly token = signal<string | null>(null);
  private readonly payload = signal<JwtPayload | null>(null);

  readonly currentUserRole = computed(() => {
    const data = this.payload();
    if (data && data.role) {
      return data.role;
    }
    return null;
  });

  readonly isLoggedIn = computed(() => {
    const token = this.token();
    if (!token) {
      return false;
    }
    return !this.isTokenExpired();
  });

  constructor() {
    this.initializeAuth();

    effect(() => {
      const t = this.token();
      if (t) localStorage.setItem(TOKEN_KEY, t);
      else localStorage.removeItem(TOKEN_KEY);
    });
  }

  private initializeAuth(): void {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedToken) this.setTokenAndPayload(storedToken);
  }

  private decodeJwt(token: string): JwtPayload | null {
    try {
      const parts = token.split('.');
      if (parts.length < 2) throw new Error('Malformed token');
      const payloadBase64 = parts[1];
      const decoded = atob(payloadBase64);
      return JSON.parse(decoded);
    } catch (err) {
      console.error('Invalid JWT format:', err);
      this.logout();
      return null;
    }
  }

  private isTokenExpired(): boolean {
    const p = this.payload();
    if (!p) return true;
    return p.exp * 1000 < Date.now();
  }

  private setTokenAndPayload(token: string): void {
    const decoded = this.decodeJwt(token);
    if (decoded && decoded.exp * 1000 > Date.now()) {
      this.token.set(token);
      this.payload.set(decoded);
    } else {
      this.logout();
    }
  }

  /** ✅ Login now checks localStorage users instead of hardcoded ones */
  login(email: string, password: string): Observable<AuthResponse | null> {
    const storedUsers = localStorage.getItem(USERS_KEY);
    const users: { email: string; password: string; role: 'admin' | 'user' }[] = storedUsers
      ? JSON.parse(storedUsers)
      : [];

    let matchedUser: { email: string; password: string; role: 'admin' | 'user' } | null = null;

    for (const user of users) {
      if (user.email === email && user.password === password) {
        matchedUser = user;
        break;
      }
    }

    if (!matchedUser) return of(null);

    // Generate fake JWT token
    const exp = Math.floor(Date.now() / 1000) + 3600;
    const payload = {
      sub: matchedUser.email,
      email: matchedUser.email,
      role: matchedUser.role,
      iat: Math.floor(Date.now() / 1000),
      exp,
    };
    const token = `header.${btoa(JSON.stringify(payload))}.signature`;

    return of({ token }).pipe(
      tap((res) => {
        if (res?.token) this.setTokenAndPayload(res.token);
      })
    );
  }

  logout(): void {
    this.token.set(null);
    this.payload.set(null);
    localStorage.removeItem(TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this.token();
  }
}
