import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = async () => {
  const auth = inject(Auth);
  const router = inject(Router);
  return new Promise(resolve => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        resolve(true);
      } else {
        resolve(router.createUrlTree(['/sign-in']));
      }
      unsubscribe();
    });
  });
};