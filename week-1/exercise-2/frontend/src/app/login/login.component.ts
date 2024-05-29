import { Component, OnInit, inject } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    FormSubmittedEvent,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import {} from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import AuthService from '../auth/auth.service';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
    isFormSubmitted = false;

    authService = inject(AuthService);
    router = inject(Router);

    loginForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });

    ngOnInit(): void {
        this.loginForm.events.subscribe((event) => {
            if (event instanceof FormSubmittedEvent) {
                this.isFormSubmitted = true;
            }
        });
    }

    get username() {
        return this.loginForm.get('username');
    }

    get password() {
        return this.loginForm.get('password');
    }

    async onSubmit() {
        if (!this.loginForm.valid) {
            console.log('Invalid form', this.loginForm, this.isFormSubmitted);
            return;
        }
        const ob = this.authService.login(this.username?.value!, this.password?.value!);
        ob.pipe(
            catchError((error) => {
                console.log({ error });
                return of(error);
            })
        ).subscribe((data) => {
            console.log({ data });
            if (data instanceof HttpErrorResponse) {
                alert(data.message);
            } else {
                this.router.navigate(['/welcome']);
            }
        });
        return true;
    }
}
