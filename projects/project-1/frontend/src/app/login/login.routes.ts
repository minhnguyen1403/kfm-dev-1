import { Routes } from "@angular/router";
import { LoginComponent } from "./login.component";

const LoginRoutes: Routes = [
    {
        path: "login",
        pathMatch: "full",
        title: "Login",
        component: LoginComponent
    }
]

export default LoginRoutes;