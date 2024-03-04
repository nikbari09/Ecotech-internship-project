import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserLoginService } from 'src/app/services/user-login.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent {
  address = {
    street: '',
    city: '',
    state: '',
    zipCode: ''
  };
  constructor(private _userloginService:UserLoginService,
    private _dialogRef:MatDialogRef<AddressComponent>){}
  id!:any;
  ngOnInit(){
    const keys= Object.keys(localStorage);
    for(const key of keys)
    {
      if(key === 'user' || key ==='admin')
      {
        const storedrole=localStorage.getItem(key);
        if(storedrole){
        const value=JSON.parse(storedrole) as any[];
        this.id=value[0].id;
        // this.email=value[0].email;
      }
      }
    }

  }

  submitForm(): void {
    console.log(this.id);
    console.log(this.address);
    localStorage.setItem('address',JSON.stringify(this.address));
    this._dialogRef.close();
    window.location.reload();
  }
}
