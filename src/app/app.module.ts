import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ForgetPwdComponent } from './components/forget-pwd/forget-pwd.component';
import { ChangePwdComponent } from './components/change-pwd/change-pwd.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupModule } from './components/signup/signup.module';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatIconButton } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './components/home/home.component';
import { OffersComponent } from './components/offers/offers.component';
import { CartComponent } from './components/cart/cart.component';
import { AddMenuComponent } from './components/add-menu/add-menu.component';
import { AddressComponent } from './components/address/address.component';
import { OrdersComponent } from './components/orders/orders.component';
// import { OrdersComponent } from './orders/orders.component';
// import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgetPwdComponent,
    ChangePwdComponent,
    DashboardComponent,
    HomeComponent,
    OffersComponent,
    CartComponent,
    AddMenuComponent,
    AddressComponent,
    OrdersComponent,
    // OrdersComponent,
    // AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SignupModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule, 
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatChipsModule,
    MatSidenavModule,
    MatExpansionModule,
    MatTooltipModule,
    MatListModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
