import { Component } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orderData!:any;
  address!:any;
  street!:any;
  role!:any;
  email!:any;
  constructor(private _ordersService:OrdersService){}
  ngOnInit(){
    const keys= Object.keys(localStorage);
    for(const key of keys)
    {
      if(key === 'user' || key === 'admin')
      {
        const storedrole=localStorage.getItem(key);
        if(storedrole){
        const value=JSON.parse(storedrole) as any[];
        this.role=value[0].role;
        this.email=value[0].email;
        }
      }
    }


    this._ordersService.getOrder().subscribe({
      next:(res)=>{
        console.log(res);
        // console.log(this.orderData);
        res.reverse();
        this.orderData=res;
      },
      error:(err)=>{

      }
    })
  }

  OnConfirm(id:any){
    for(let data of this.orderData)
    {
      if(id === data.id)
      {
        data.details[0].status='Confirm';
        this._ordersService.updateStatus(id,data).subscribe({
          next:(res)=>{
            console.log(res);
            window.location.reload();
          },
          error:(err)=>{
            console.log(err);
          }
        })
      }
    }
    // this._ordersService.updateStatus(id,this.orderData.value).subscribe({
    //   next:(res)=>{
    //     console.log(res);
    //     // window.location.reload();
    //   },
    //   error:(err)=>{
    //     console.log(err);
    //   }
    // })

  }

  OnProcess(id:any){
    for(let data of this.orderData)
    {
      if(id === data.id)
      {
        data.details[0].status='Food In Process';
        this._ordersService.updateStatus(id,data).subscribe({
          next:(res)=>{
            console.log(res);
            window.location.reload();
          },
          error:(err)=>{
            console.log(err);
          }
        })
      }
    }
  }

  OnDelivery(id:any){
    setTimeout(() => {
      for(let data of this.orderData)
      {
      if(id === data.id)
      {
        data.details[0].status='Delivered';
        this._ordersService.updateStatus(id,data).subscribe({
          next:(res)=>{
            console.log(res);
            window.location.reload();
          },
          error:(err)=>{
            console.log(err);
          }
        })
      }
      }
      // location.reload();
    }, 1 * 60 * 1000);
  }

}
