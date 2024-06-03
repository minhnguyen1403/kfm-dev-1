import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { authGuard } from '../../guards/auth-guard.guard';
import { BaseLayoutComponent } from '../../layouts/base-layout/base-layout.component';

const WelcomeRoutes: Routes = [
    {
        path: 'welcome',
        pathMatch: 'full',
        component: BaseLayoutComponent,
        title: 'Welcome',
        children: [
            {
                path: '',
                component: WelcomeComponent,
            },
        ],
        canActivate: [authGuard],
    },
];

export default WelcomeRoutes;
