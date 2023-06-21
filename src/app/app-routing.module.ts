import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate, CanLoad } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { ValidarTokenGuard } from './guards/validar-token.guard';

const routes: Routes = [

  {
    path: 'auth',
    component: LoginComponent
  },

  {
    path: '', loadChildren: () =>
    import('./protected/protected.module').then(m => m.ProtectedModule),
    canActivate:[ValidarTokenGuard],
    canLoad: [ValidarTokenGuard]
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
