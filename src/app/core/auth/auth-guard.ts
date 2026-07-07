import { Router, type CanActivateFn } from '@angular/router';
import { AuthStore } from './auth-store';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  const isAuthenticated = authStore.isAuthenticated();

  return isAuthenticated ? true : router.createUrlTree(['/login']);
};

export const guestGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  return authStore.isAuthenticated()
    ? router.createUrlTree(['/'])
    : true;
};
