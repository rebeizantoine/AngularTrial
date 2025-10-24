// src/app/services/auth123.ts
import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';

// ----- Interfaces -----
export interface User {
  email: string;
  password: string;
  role: 'admin' | 'user';
}

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

// ----- Constants -----
const TOKEN_KEY = 'authToken';
const CURRENT_USER_KEY = 'currentUser';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  // --- Signals ---
  private readonly token = signal<string | null>(null);
  private readonly payload = signal<JwtPayload | null>(null);

  // --- Computed signals ---
  readonly currentUserRole = computed(() => this.payload()?.role ?? null);
  readonly isLoggedIn = computed(() => !!this.token() && !this.isTokenExpired());

  constructor() {
    this.initializeAuth();

    // Sync token with localStorage
    effect(() => {
      const t = this.token();
      if (t) localStorage.setItem(TOKEN_KEY, t);
      else localStorage.removeItem(TOKEN_KEY);
    });
  }

  // ----- Private helpers -----
  private initializeAuth(): void {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedToken) this.setTokenAndPayload(storedToken);
  }

  private decodeJwt(token: string): JwtPayload | null {
    try {
      const parts = token.split('.');
      if (parts.length < 2) throw new Error('Malformed token');
      const decoded = atob(parts[1]);
      return JSON.parse(decoded);
    } catch (err) {
      console.error('Invalid JWT format', err);
      this.logout();
      return null;
    }
  }

  private isTokenExpired(): boolean {
    const p = this.payload();
    return !p || p.exp * 1000 < Date.now();
  }

  private setTokenAndPayload(token: string): void {
    const decoded = this.decodeJwt(token);
    if (decoded && decoded.exp * 1000 > Date.now()) {
      decoded.role = decoded.role.toLowerCase() as 'admin' | 'user';
      this.token.set(token);
      this.payload.set(decoded);
    } else {
      this.logout();
    }
  }

  // ----- Public methods -----

  login(email: string, password: string): Observable<AuthResponse | null> {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    const user = users.find(
      (u: User) =>
        u.email.trim().toLowerCase() === email.trim().toLowerCase() &&
        u.password.trim() === password.trim()
    );

    if (!user) return of(null);

    const exp = Math.floor(Date.now() / 1000) + 3600;
    const payload: JwtPayload = {
      sub: users.indexOf(user),
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp,
    };

    const token = `header.${btoa(JSON.stringify(payload))}.signature`;

    return of({ token }).pipe(
      tap(() => {
        this.setTokenAndPayload(token);
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      })
    );
  }

  register(email: string, password: string, role: 'admin' | 'user'): Observable<AuthResponse> {
    const usersKey = 'users';
    const data = localStorage.getItem(usersKey);
    const users: User[] = data ? JSON.parse(data) : [];

    if (users.some((u) => u.email === email)) {
      return of({ token: '' }).pipe(
        tap(() => {
          throw new Error('User already exists!');
        })
      );
    }

    const newUser: User = { email, password, role };
    users.push(newUser);
    localStorage.setItem(usersKey, JSON.stringify(users));

    const exp = Math.floor(Date.now() / 1000) + 3600;
    const payload: JwtPayload = {
      sub: users.length,
      email,
      role,
      iat: Math.floor(Date.now() / 1000),
      exp,
    };
    const token = `header.${btoa(JSON.stringify(payload))}.signature`;

    this.setTokenAndPayload(token);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ email, role }));

    return of({ token });
  }

  logout(): void {
    this.token.set(null);
    this.payload.set(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this.token();
  }
  loadDevUser(): User | null {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  }
}
