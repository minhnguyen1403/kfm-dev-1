import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found.component';
import { BaseLayoutComponent } from '../../layouts/base-layout/base-layout.component';

const NotFoundRoutes: Routes = [
    {
        path: 'not-found',
        pathMatch: 'full',
        component: BaseLayoutComponent,
        title: "Not Found",
        children: [
            {
                path: '',
                component: NotFoundComponent,
            },
        ],
    },
];

export default NotFoundRoutes;
