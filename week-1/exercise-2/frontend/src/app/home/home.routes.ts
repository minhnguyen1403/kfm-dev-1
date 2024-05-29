import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { BaseLayoutComponent } from '../../layouts/base-layout/base-layout.component';

const HomeRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: BaseLayoutComponent,
        children: [{ path: '', component: HomeComponent }],
    },
];

export default HomeRoutes;
