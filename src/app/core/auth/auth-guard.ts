import { Router, type CanActivateFn } from '@angular/router';
import { AuthStore } from './auth-store';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);

  const router = inject(Router);

  if (authStore.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
