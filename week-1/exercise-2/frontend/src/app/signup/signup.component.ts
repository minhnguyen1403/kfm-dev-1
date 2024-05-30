import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    FormSubmittedEvent,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import { } from '@angular/material/input';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import AuthService from '../auth/auth.service';

function passwordConfirming(control: AbstractControl) {
    if (control?.value.password !== control?.value.confirmPassword) {
        return { unmatch: true };
    }
    return null;
}

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
    isFormSubmitted = false;
    confirmPasswordErrorMessage = 'confirm password is required';

    authService = inject(AuthService);
    router = inject(Router);

    signUpForm = new FormGroup(
        {
            username: new FormControl('', [Validators.required]),
            fullName: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
            confirmPassword: new FormControl('', [Validators.required]),
        },
        {
            validators: passwordConfirming,
        }
    );

    ngOnInit(): void {
        this.signUpForm.events.subscribe((event) => {
            if (event instanceof FormSubmittedEvent) {
                this.isFormSubmitted = true;
            }
        });
    }

    get username() {
        return this.signUpForm.get('username');
    }

    get fullName() {
        return this.signUpForm.get('fullName');
    }

    get password() {
        return this.signUpForm.get('password');
    }

    get confirmPassword() {
        return this.signUpForm.get('confirmPassword');
    }

    onSubmit() {
        if (!this.signUpForm.valid) {
            console.log('Invalid form', this.signUpForm, this.isFormSubmitted);
            return;
        }
        const ob = this.authService.register({
            username: this.username?.value!,
            password: this.password?.value!,
            full_name: this.fullName?.value!,
        });
        ob.pipe(
            catchError((error) => {
                console.log(error);
                return of(error);
            })
        ).subscribe((data) => {
            console.log({ data });
            if (data instanceof HttpErrorResponse) {
                alert(data.message);
            } else {
                this.router.navigate(['/login']);
            }
        });

        return true;
    }
}
