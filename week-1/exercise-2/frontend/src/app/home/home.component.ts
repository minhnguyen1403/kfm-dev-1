import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BaseLayoutComponent } from '../../layouts/base-layout/base-layout.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [BaseLayoutComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent {}
