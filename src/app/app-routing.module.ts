import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/sign-up/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { loginAuthGuard } from './guards/login-auth.guard';
import { HomeComponent } from './components/home/home.component';
import { OffersComponent } from './components/offers/offers.component';
import { CartComponent } from './components/cart/cart.component';
import { AddMenuComponent } from './components/add-menu/add-menu.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangePwdComponent } from './components/change-pwd/change-pwd.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'', component:SignupComponent},
  {path:'dashboard', component:DashboardComponent, canActivate:[loginAuthGuard],
  children:[
    {path:'home', component:HomeComponent},
    {path:'offers', component:OffersComponent},
    {path:'cart',component:CartComponent},
    {path:'orders', component:OrdersComponent},
    {path:'profile', component:ProfileComponent},
    {path:'change-password', component:ChangePwdComponent}
    
  ]},
  {path:'add-menu', component:AddMenuComponent}
  // {path:'admin-dashboard',component:AdminDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
