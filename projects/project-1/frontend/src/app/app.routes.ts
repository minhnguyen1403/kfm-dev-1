import { Routes } from '@angular/router';
import WelcomeRoutes from './welcome/welcome.routes';
import SignUpRoutes from './signup/signup.routes';
import LoginRoutes from './login/login.routes';
import NoPermissionRoutes from './no-permission/no-permission.routes';
import NotFoundRoutes from './not-found/not-found.routes';
import HomeRoutes from './home/home.routes';
import ForgotPasswordRoutes from './forgot-password/forgot-password.routes';
import DitreRoutes from './ditre/ditre.routes';

export const routes: Routes = [
    ...SignUpRoutes,
    ...LoginRoutes,
    ...WelcomeRoutes,
    ...NoPermissionRoutes,
    ...NotFoundRoutes,
    ...HomeRoutes,
    ...ForgotPasswordRoutes,
    ...DitreRoutes,
    { path: '**', redirectTo: '/not-found' },
];
