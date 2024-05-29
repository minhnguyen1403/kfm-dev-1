import { Routes } from "@angular/router";
import { LoginComponent } from "./login.component";

const LoginRoutes: Routes = [
    {
        path: "login",
        pathMatch: "full",
        component: LoginComponent
    }
]

export default LoginRoutes;