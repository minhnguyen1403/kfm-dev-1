import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import AuthService from '../app/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const authSerivce = inject(AuthService);
    if (authSerivce.isAuth) {
        return true;
    } else {
        return router.navigateByUrl('/no-permission');
    }
};
