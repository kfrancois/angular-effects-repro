import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'broken',
    loadComponent: () =>
      import('./broken-popover.component').then((m) => m.BrokenPopoverExample),
  },
  {
    path: 'working',
    loadComponent: () =>
      import('./working-popover.component').then(
        (m) => m.WorkingPopoverExample
      ),
  },
];
