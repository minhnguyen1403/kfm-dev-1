import { Routes } from '@angular/router';
import { NoPermissionComponent } from './no-permission.component';
import { BaseLayoutComponent } from '../../layouts/base-layout/base-layout.component';

const NoPermissionRoutes: Routes = [
    {
        path: 'no-permission',
        pathMatch: 'full',
        component: BaseLayoutComponent,
        title: "No Permission",
        children: [
            {
                path: '',
                component: NoPermissionComponent,
            },
        ],
    },
];

export default NoPermissionRoutes;
