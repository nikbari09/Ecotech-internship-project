import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  notification:any[]=[];
  role!:any;
  email!:any;
  constructor(private _orderService:OrdersService,
    private _router:Router){}

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

    this._orderService.getOrder().subscribe({
      next:(res)=>{
        for(let value of res){
          if(value.details[0].status==='placed')
          {
            this.notification.push(value);
          }
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  Onclick(){
    this._router.navigate(['/dashboard/orders']);

  }

}
