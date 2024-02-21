import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <a [routerLink]="['broken']"> Broken example </a>
    <a [routerLink]="['working']"> Working example </a>
    <br /><br /><br /><br /><br />

    <router-outlet />
  `,
})
export class AppComponent {}
