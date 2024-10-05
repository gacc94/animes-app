import { Routes } from "@angular/router";

export default [
  {
    path: '',
    loadComponent: () => import('./presentation/views/layout/layout.component'),
    children: [
      {
        path: 'characters',
        loadComponent: () => import('./presentation/views/characters/characters.component')
      },
      {
        path: 'planets',
        loadComponent: () => import('./presentation/views/planets/planets.component')
      },
      {
        path: '**',
        redirectTo: 'characterts',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
] as Routes
