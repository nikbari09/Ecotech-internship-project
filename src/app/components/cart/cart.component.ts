import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { __values } from 'tslib';
import { AddressComponent } from '../address/address.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OrdersService } from 'src/app/services/orders.service';
import { FormControl, FormGroup } from '@angular/forms';
import { TimeService } from 'src/app/services/time.service';
import { UsersService } from 'src/app/services/users.service';
import { PaymentComponent } from '../payment/payment.component';

declare var Razorpay:any;
export interface add {
  street: string;
  city:string;
  state:string;
  pinCode:string;
}
export interface isplaceorder{
  address:add[];
  email:any;
  firstname:any;
  lastname:any;
  total_cost:any;
  count:any;
  item_name:any;
  status:any;
  time:any;
  payment_mode:any;
  transaction_id:any;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  constructor(private router:Router,
  private _dialog:MatDialog,
  private _orderService:OrdersService,
  private _timeService:TimeService,
  private _userService:UsersService){}
  
  inputnumber = 1;
  firstname!:any;
  lastname!:any;
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
  currentTime:any;
  data:any;
  
  
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
    // total cost of order
    this.totalcost=this.inputnumber*this.price;
    //getting user firstname and lastname
    this._userService.getUser().subscribe({
      next:(res)=>{
        for(let value of res)
        {
          if(this.email === value.email)
          {
            this.firstname=value.firstname;
            this.lastname=value.lastname;
          }
        }
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
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
    const razorpayOptions={
      description:'sample razorpay demo',
      mode:'Cash On Delivery',
      currency:'INR',
      "amount": this.totalcost*100,
      name:'UTIN',
      key:'rzp_test_1w6VzlVepugGZD',
      handler: (response: any) => {
        console.log('Payment successful. Payment ID:', response.razorpay_payment_id);
        // Handle payment success
        this.currentTime=this._timeService.getTime();
        this.placeorder=[{address:[{street:this.street,city:this.city,state:this.state,pinCode:this.pin}],email:this.email,total_cost:this.totalcost,count:this.inputnumber,item_name:this.title,status:'placed',time:this.currentTime,firstname:this.firstname,lastname:this.lastname,payment_mode:'Online',transaction_id:response.razorpay_payment_id}];
        // this.placeorder=this.isaddress+this.totalcost;
        this.orderForm.value.details=this.placeorder;
        // console.log(this.placeorder);
        localStorage.setItem('order',JSON.stringify(this.placeorder));
        // const data=this.orderForm.value
        // const dialogref=this._dialog.open(PaymentComponent,{data});
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
      },
      prefill:{
        "name": this.firstname+' '+this.lastname,
        email:this.email,
        phone:'',
      },
      theme:{
        color:'#f37254'
      },
      modal:{
        ondismiss:()=>{
          console.log('Payment Cancelled.')
        },
      }
    }
    const rzp = new Razorpay(razorpayOptions);
    rzp.on('payment.failed',(response:any)=>{
       console.error('Payment failed:', response.error.code, response.error.description);
    });
    rzp.open();

  
    const successCallback=(Payment_id:any)=>{
      console.log(Payment_id);
      
    }
    const failureCallback=(e:any)=>{
      console.log(e);
    }
    // Razorpay.open(razorpayOptions,successCallback,failureCallback);
  }

  addAddress(){
    this._dialog.open(AddressComponent);
    // window.location.reload();
  }
  
  
}
