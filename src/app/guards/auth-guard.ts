// src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth123';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    console.log('AUTH GUARD: User is logged in.');
    return true;
  }

  console.warn('AUTH GUARD BLOCKED: User is not logged in.');
  alert('You must be logged in to access this page.');
  return router.createUrlTree(['/login']);
};
