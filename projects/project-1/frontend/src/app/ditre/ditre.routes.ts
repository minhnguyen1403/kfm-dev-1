import { Routes } from "@angular/router";
import { DitreComponent } from "./ditre.component";
import { BaseLayoutComponent } from "../../layouts/base-layout/base-layout.component";
import { authGuard } from "../../guards/auth-guard.guard";

const DitreRoutes: Routes = [
    {
        path: "ditre",
        pathMatch: "full",
        title: "Đi trễ",
        component: BaseLayoutComponent,
        children: [{ path: '', component: DitreComponent }],
        canActivate: [authGuard],
    }
]

export default DitreRoutes;