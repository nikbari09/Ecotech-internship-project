import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserLoginService } from 'src/app/services/user-login.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.css']
})
export class ChangePwdComponent {
  changePasswordForm!: FormGroup;
  email!:any;
  userData!:any;
  userLoginData!:any;

  constructor(private formBuilder: FormBuilder,private snackBar: MatSnackBar
    ,private _dialogref:MatDialogRef<ChangePwdComponent>,
    private _userService:UsersService,
    private _userLoginService:UserLoginService){}

    ngOnInit(){
      this.changePasswordForm = this.formBuilder.group({
        currentPassword:'',
        newPassword: '',
        confirmPassword:'',
      })

      const keys= Object.keys(localStorage);
      for(const key of keys)
      {
        if(key === 'user' || key ==='admin')
        {
          const storedrole=localStorage.getItem(key);
          if(storedrole){
          const value=JSON.parse(storedrole) as any[];
          // this.role=value[0].role;
          this.email=value[0].email;
          }
        }
      }
      this._userService.getUser().subscribe({
        next:(res)=>{
          for(let val of res){
            if(this.email === val.email){
              this.userData=val;
            }
          }
        },
        error:(err)=>{
          console.log(err);
        }
      })

      this._userLoginService.getUserLogin().subscribe({
        next:(res1)=>{
          for(let val1 of res1){
            if(this.email == val1.email)
            {
              this.userLoginData=val1;
            }
          }
        },
        error:(err1)=>{
          console.log(err1);
          
        }
      })
    }


  onSubmit() {
    if (this.changePasswordForm.valid) {
      
      const currentPassword = this.changePasswordForm.value.currentPassword;
      const newPassword = this.changePasswordForm.value.newPassword;
      // const password=newPassword;
      if(currentPassword == newPassword){
        this.snackBar.open('Current Password and New Password should not be the same.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
      }
      else{
        this.userData.password=newPassword;
        this._userService.updatePassword(this.userData.id,this.userData).subscribe();
        this.userLoginData.password=newPassword;
        this._userLoginService.updateUserPassword(this.userLoginData.id,this.userLoginData).subscribe({
          next:(res)=>{
            console.log(res);
          },
          error:(err)=>{
            console.log(err); 
          }
        });
        // For demonstration purposes, let's assume a success message:
        this.snackBar.open('Password changed successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
      }
      // Reset the form
      this.changePasswordForm.reset();
      this._dialogref.close();
    }
  }
}
