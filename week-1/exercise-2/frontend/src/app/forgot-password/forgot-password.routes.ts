import { Routes } from "@angular/router";
import { ForgotPasswordComponent } from "./forgot-password.component";

const ForgotPasswordRoutes: Routes = [
    {
        path: "forgot-password",
        pathMatch: "full",
        title: "Forgot Password",
        component: ForgotPasswordComponent,
    }
]

export default ForgotPasswordRoutes;