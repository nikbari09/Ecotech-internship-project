import { Component } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
interface transactions{
  date:any,
  time:any;
  transaction_id:any;
  payment_mode:any;
  amount:number;
}
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {
  detail:transactions[]=[];
  orderData:any;
  constructor(private _orderService:OrdersService){}

  ngOnInit(){
    this._orderService.getOrder().subscribe({
      next:(res)=>{
        this.orderData=res.reverse();
        for(let value of this.orderData)
        {
          if(value.details[0].status === 'Delivered')
          {
            this.detail.push({date:value.date,time:value.time,transaction_id:value.details[0].transaction_id,payment_mode:value.details[0].payment_mode,amount:value.details[0].total_cost});
          }
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}
