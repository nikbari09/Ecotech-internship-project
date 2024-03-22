import { Component } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { TimeService } from 'src/app/services/time.service';
import { UsersService } from 'src/app/services/users.service';

interface printing{
  firstname:string;
  lastname: string;
  date:any;
  order_time:any;
  Item_name:any;
  count:number;
  total_cost:number;
  Address:any[];
}

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
  userOrder:any[]=[];
  currentTime:any;
  printbills:printing[]=[];

  constructor(private _ordersService:OrdersService,
    private _usersService:UsersService,
    private _timeService:TimeService){}
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
        // console.log(res);
        res.reverse();
        this.orderData=res;
        for(let response of res)
        {
          if(response.details[0].email === this.email)
          {
            this.userOrder.push(response);
          }
        }
        // console.log(this.userOrder);
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  OnConfirm(id:any){
    for(let data of this.orderData)
    {
      if(id === data.id)
      {
        data.details[0].status='Confirm';
        // data.time=this._timeService.getTime();
        this._ordersService.updateStatus(id,data).subscribe({
          next:(res)=>{
            // console.log(res);
            window.location.reload();
          },
          error:(err)=>{
            console.log(err);
          }
        })
      }
    }
  }

  OnProcess(id:any){
    for(let data of this.orderData)
    {
      if(id === data.id)
      {
        data.details[0].status='Food In Process';
        // data.time=this._timeService.getTime();
        this._ordersService.updateStatus(id,data).subscribe({
          next:(res)=>{
            // console.log(res);
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
    // first we change the status to out for delivery and after that by using set timer we are changing status to delivered
    for(let data of this.orderData)
      {
      if(id === data.id)
      {
        data.details[0].status='Out for Delivery';
        // data.time=this._timeService.getTime();
        this._ordersService.updateStatus(id,data).subscribe({
          next:(res)=>{
            // console.log(res);
            // window.location.reload();
          },
          error:(err)=>{
            console.log(err);
          }
        })
      }
      }
    // below code for timer from out for delivery to delivered.
    setTimeout(() => {
      for(let data of this.orderData)
      {
      if(id === data.id)
      {
        data.details[0].status='Delivered';
        data.time=this._timeService.getTime();
        console.log('inside settimeout');
        
        this._ordersService.updateStatus(id,data).subscribe({
          next:(res)=>{
            // console.log(res);
            window.location.reload();
          },
          error:(err)=>{
            console.log(err);
          }
        })
      }
      }
    }, 1 * 60 * 1000);
  }

  OnCancel(id:any){
    for(let data of this.orderData)
    {
      if(id === data.id)
      {
        data.details[0].status='Cancelled';
        // data.time=this._timeService.getTime();
        this._ordersService.updateStatus(id,data).subscribe({
          next:(res)=>{
            // console.log(res);
            window.location.reload();
          },
          error:(err)=>{
            console.log(err);
          }
        })
      }
    }
  }

  print(){
    const printcontent=document.getElementById('print-content')!.innerHTML;
    const originalcontent=document.body.innerHTML;
    document.body.innerHTML=printcontent+'UTIN Solutions '+'Contact: '+'+91 7505008076';
    window.print();
    document.body.innerHTML=originalcontent;
  }
}
