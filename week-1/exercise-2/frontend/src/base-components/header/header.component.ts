import { Component, inject } from '@angular/core';
import AuthService from '../../app/auth/auth.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent {
    authService = inject(AuthService)

    get isLogin() {
        return this.authService.isAuth
    }

    handleLogout() {
        this.authService.logout()
    }
}
