import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OfferService } from 'src/app/services/offer.service';
import { AddOfferComponent } from '../add-offer/add-offer.component';

interface getdata{
title:any;
price:any;
}
@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent {
  data:getdata[]=[];
  role!:any;
  email!:any;
  constructor(private _offerService:OfferService,
    private _router:Router,
    private _dialog:MatDialog){}
  offers!:any;
  ngOnInit(){
    const keys= Object.keys(localStorage);
    for(const key of keys)
    {
      if(key === 'user' || key ==='admin')
      {
        const storedrole=localStorage.getItem(key);
        if(storedrole){
        const value=JSON.parse(storedrole) as any[];
        this.role=value[0].role;
        this.email=value[0].email;
      }
      }
    }

    this._offerService.getOffer().subscribe({
      next:(res)=>{
        console.log(res);
        res.reverse();
        this.offers=res;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  OnaddCart(items:any){
    // console.log(items);
    // localStorage.setItem('item',JSON.stringify(items)as any);
    // this._router.navigate(['/dashboard/cart']);
    this.data=[{title:(items.item1+" + "+items.item2),price:items.discounted_price}];
    console.log(this.data);
    localStorage.setItem('item',JSON.stringify(this.data[0]));
    this._router.navigate(['/dashboard/cart']);  
  }

  OnEdit(data:any){
    this._dialog.open(AddOfferComponent,{data});
  }

  OnDelete(id:any){
    this._offerService.deleteOffer(id).subscribe({
      next:(res)=>{
        window.location.reload();
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  addOffer(){
    this._dialog.open(AddOfferComponent);
  }

}
