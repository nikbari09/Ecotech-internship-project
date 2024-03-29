import { Component } from '@angular/core';
import { OrdersComponent } from '../orders/orders.component';
import { OrdersService } from 'src/app/services/orders.service';
import { MatDialog } from '@angular/material/dialog';
import { TransactionComponent } from '../transaction/transaction.component';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  food_items:number=0;
  count:number=0;
  amount:number=0;
  cancel_count:number=0;
  constructor(private _orderService:OrdersService,
    private _menuService:MenuService,
    private _dialog:MatDialog){}
  ngOnInit(){
    this._orderService.getOrder().subscribe({
      next:(res)=>{
        for(let value of res){
          if(value.details[0].status == 'Delivered'){
            this.count++;
            this.amount+=value.details[0].total_cost;
          }
          if(value.details[0].status == 'Cancelled')
          {
            this.cancel_count++;
          }
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })

    this._menuService.getMenu().subscribe({
      next:(res)=>{
        for(let value of res)
        {
          this.food_items++;
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  showStatement(){
    this._dialog.open(TransactionComponent);
  }
}
