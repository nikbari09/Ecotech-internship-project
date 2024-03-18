import { Component, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent {
  offer!:any;
  countOffer=0;
  constructor(private _dialogRef:MatDialogRef<AddOfferComponent>,@Inject(MAT_DIALOG_DATA) public data:any,
  private _offerService:OfferService){
    this.offer= {
      title: '',
      item1: '',
      item2: '',
      actual_price: '',
      discounted_price: ''
    };
  }

  ngOnInit(): void {
    if(this.data!=null){
      this.offer=this.data;
    }
    console.log(this.data)
  }

  addOffer() {
    if(this.data)
    {
      this._offerService.updateOffer(this.offer.id,this.offer).subscribe({
        next:(res)=>{
          this._dialogRef.close();
          window.location.reload();
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    }
    else
    {
      // console.log('Offer submitted:', this.offer);
      this._offerService.addOffer(this.offer).subscribe({
        next: (res)=>{
          this._dialogRef.close();
          window.location.reload();
          this.countOffer++;
       },
       error: (err)=>{
          console.log(err);
        }
      })
    }
  }
}
