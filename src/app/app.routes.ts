import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path:'todo',
    loadComponent:()=> import('./tasks/tasks.component').then(c => c.TasksComponent)
  },
  {
    path:'**',
    loadComponent:()=>import('./not-found/not-found.component').then(c =>c.NotFoundComponent)
  }
];
