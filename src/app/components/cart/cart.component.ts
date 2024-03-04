import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { __values } from 'tslib';
import { AddressComponent } from '../address/address.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OrdersService } from 'src/app/services/orders.service';
import { FormControl, FormGroup } from '@angular/forms';

export interface add {
  street: string;
  city:string;
  state:string;
  pinCode:string;
}

export interface isplaceorder{
  address:add[];
  email:any;
  totalcost:any;
  count:any;
  item_name:any;
  status:any;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  constructor(private router:Router,
  private _dialog:MatDialog,
  private _orderService:OrdersService){}
  inputnumber = 1;
  email!:string;
  title!:string;
  price!:number;
  url!:string;
  items!:any[];
  totalcost!:number;
  street!:string;
  city!:string;
  state!:string;
  pin!:string;
  isaddress:any;
  placeorder:isplaceorder[]=[];
  orderForm:FormGroup = new FormGroup({});
  
  
  ngOnInit(){
    this.orderForm=new FormGroup({
      details:new FormControl('')
    })
    const keys= Object.keys(localStorage);
    for(const key of keys)
    {
      if(key ==='admin' || key==='user')
      {
        const storedrole=localStorage.getItem(key);
        if(storedrole){
        const value=JSON.parse(storedrole) as any[];
        this.email=value[0].email;
      }
      }
      if(key === 'item')
      {
        const storedrole=localStorage.getItem(key);
        if(storedrole){
        const value=JSON.parse(storedrole) ;
        // console.log(value);
        this.items=value;
        console.log(this.items);
        
        this.title=value.title;
        this.price=<number>value.price;
        this.url=value.image;
      }
      }
      else if(key === 'address')
      {
        const storedaddress=localStorage.getItem(key);
        
        if(storedaddress){
          const add=JSON.parse(storedaddress);
          this.isaddress=storedaddress;
          console.log(this.isaddress);
          
          this.street=add.street;
          this.city=add.city;
          this.state=add.state;
          this.pin=add.zipCode;
        }
      }
    }
    this.totalcost=this.inputnumber*this.price;
  }
  plus()
  {
   this.inputnumber = this.inputnumber+1;
   this.totalcost=this.inputnumber*this.price;
  }
  minus()
  {
    if(this.inputnumber != 1)
  {
   this.inputnumber = this.inputnumber-1;
   this.totalcost=this.inputnumber*this.price;
  }
  
  }

  OnRemove(){
     localStorage.removeItem('item');
    //  this.router.navigate(['/dashboard/cart']);
    window.location.reload();
  }

  placeOrder(){
    this.placeorder=[{address:[{street:this.street,city:this.city,state:this.state,pinCode:this.pin}],email:this.email,totalcost:this.totalcost,count:this.inputnumber,item_name:this.title,status:'placed'}];
    // this.placeorder=this.isaddress+this.totalcost;
    this.orderForm.value.details=this.placeorder;
    console.log(this.placeorder);
    localStorage.setItem('order',JSON.stringify(this.placeorder));
    this._orderService.addOrder(this.orderForm.value).subscribe({
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

  addAddress(){
    this._dialog.open(AddressComponent);
    // window.location.reload();
  }
  
  
}
