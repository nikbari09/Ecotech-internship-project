import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/sign-up/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { loginAuthGuard } from './guards/login-auth.guard';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'', component:SignupComponent},
  {path:'dashboard', component:DashboardComponent, canActivate:[loginAuthGuard]},
  // {path:'admin-dashboard',component:AdminDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
