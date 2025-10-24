import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth123';

/**
 * Guard that checks if the logged-in user has the 'admin' role.
 */
export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = authService.isLoggedIn() || !!authService.loadDevUser();
  const role = authService.currentUserRole() || authService.currentUserRole();

  console.log('ADMIN GUARD:', { isLoggedIn, role });

  if (isLoggedIn && role === 'admin') {
    console.log('ADMIN GUARD PASSED: Access granted');
    return true;
  }

  console.warn('ADMIN GUARD BLOCKED: User is not an admin.');
  alert('Access Denied: Admin privileges required.');
  return router.createUrlTree(['/unauthorized']);
};
