import { Component } from '@angular/core';
import { HeaderComponent } from '../../base-components/header/header.component';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-base-layout',
    standalone: true,
    imports: [HeaderComponent, RouterModule],
    templateUrl: './base-layout.component.html',
    styleUrl: './base-layout.component.scss',
})
export class BaseLayoutComponent {}
