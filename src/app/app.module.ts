import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ForgetPwdComponent } from './components/forget-pwd/forget-pwd.component';
import { ChangePwdComponent } from './components/change-pwd/change-pwd.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupModule } from './components/signup/signup.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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
import { AddOfferComponent } from './components/add-offer/add-offer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { DeliveryBoyLoaderComponent } from './components/delivery-boy-loader/delivery-boy-loader.component';
import {CloudinaryModule} from '@cloudinary/ng';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { PaymentComponent } from './components/payment/payment.component';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';

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
    AddOfferComponent,
    ProfileComponent,
    DeliveryBoyLoaderComponent,
    PortfolioComponent,
    TransactionComponent,
    NotificationComponent,
    ContactUsComponent,
    PaymentComponent,
    
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
    MatRadioModule,
    MatButtonModule, 
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatChipsModule,
    MatSidenavModule,
    MatExpansionModule,
    MatTooltipModule,
    MatListModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatProgressSpinnerModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true,
      loaderId: 'deliveryBoyLoader',
    }),
    CloudinaryModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
