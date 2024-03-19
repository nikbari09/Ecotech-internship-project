import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { isplaceorder } from '../cart/cart.component';
import { FormGroup } from '@angular/forms';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  selectedPaymentMode!: string;
  creditCardNumber!: string;

  selectedPaymentMethod!:string;

  constructor(private _dialogref:MatDialogRef<PaymentComponent>,@Inject(MAT_DIALOG_DATA) public data:any,
  private _orderService:OrdersService){}

  processPayment() {
    console.log(this.data);
    console.log(this.data.details[0].payment_mode);
    this.data.details[0].payment_mode=this.selectedPaymentMethod;
    this._orderService.addOrder(this.data).subscribe({
        next:(res)=>{
          console.log(res); 
          localStorage.removeItem('item');
          window.location.reload();
          // console.log(res[0].email);
          // console.log(res.id);
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
  }
}
