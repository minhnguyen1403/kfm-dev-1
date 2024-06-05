import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import AuthService from '../auth/auth.service';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ditre',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ditre.component.html',
  styleUrl: './ditre.component.scss'
})
export class DitreComponent {
    authService = inject(AuthService);
    router = inject(Router);

    reportLateForm = new FormGroup(
        {
            minute: new FormControl(0),
        },
    );

    get minute() {
        return this.reportLateForm.get('minute');
    }

    onSubmit() {
        if (!this.reportLateForm.valid) {
            console.log('Invalid form', this.reportLateForm);
            return;
        }
        const ob = this.authService.reportLate(this.minute?.value!);
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
                this.router.navigate(['/']);
            }
        });

        return true;
    }
}
