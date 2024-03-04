import { Component } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';

// interface orderDATA{
// data:any;
// firstname:any;
// lastname:any;
// }
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
  constructor(private _ordersService:OrdersService,
    private _usersService:UsersService){}
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
        // for(let value of res)
        // {
        //   this._usersService.getUser().subscribe({
        //     next:(res1)=>{
        //       for(let resss of res1)
        //       {
        //         if(resss.email === value.details[0].email)
        //         {
        //           this.orderData=[{data:value,firstname:resss.firstname,lastname:resss.lastname}];
        //         }
        //       }
        //       console.log(this.orderData);
        //     },
        //     error:(err1)=>{
        //       console.log(err1);
        //     }
        //   })
        // }
        
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
    }, 1 * 60 * 1000);
  }

}
