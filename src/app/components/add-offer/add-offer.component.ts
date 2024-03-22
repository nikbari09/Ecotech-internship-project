import { Component, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifyOfferService } from 'src/app/services/notify-offer.service';
import { OfferService } from 'src/app/services/offer.service';

interface counting{
  count:any;
}
@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent {
  offer!:any;
  count !:number;
  value=0;
  constructor(private _dialogRef:MatDialogRef<AddOfferComponent>,@Inject(MAT_DIALOG_DATA) public data:any,
  private _offerService:OfferService, private _notifyOffer:NotifyOfferService,private snackBar:MatSnackBar){
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
    // console.log(this.data)
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
       },
       error: (err)=>{
          console.log(err);
        }
      })
      this.snackBar.open('Offer added successfully.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
      });
    }
    this.value=this.value+1;
    // console.log("add",this.count);
    this.count=this.value;
    this._notifyOffer.setCount(this.count).subscribe({
      next:(res)=>{
        // console.log(res);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
}
