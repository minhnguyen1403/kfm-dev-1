import { Routes } from "@angular/router";
import { ForgotPasswordComponent } from "./forgot-password.component";

const ForgotPasswordRoutes: Routes = [
    {
        path: "forgot-password",
        pathMatch: "full",
        component: ForgotPasswordComponent,
    }
]

export default ForgotPasswordRoutes;