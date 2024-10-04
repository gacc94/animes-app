import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dragon-ball',
    loadChildren: () => import('./features/dragon-ball/dragon-ball.routes')
  }
];
