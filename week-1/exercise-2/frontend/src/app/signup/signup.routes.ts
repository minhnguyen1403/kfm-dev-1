import { Routes } from "@angular/router";
import { SignupComponent } from "./signup.component";

const SignUpRoutes: Routes = [
    {
        path: "signup",
        pathMatch: "full",
        title: "Sign Up",
        component: SignupComponent
    }
]

export default SignUpRoutes;