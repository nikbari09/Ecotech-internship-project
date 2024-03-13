import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserLoginService } from 'src/app/services/user-login.service';
import { UsersService } from 'src/app/services/users.service';
import { LoginComponent } from '../../login/login.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  registerForm:FormGroup = new FormGroup({});

  constructor(private _userService:UsersService,private router:Router,
    private _dialogref:MatDialog,private _userloginService:UserLoginService,
    private snackBar: MatSnackBar){}

  ngOnInit() {
    this.registerForm = new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      email: new FormControl(''),
      dob: new FormControl(''),
      password: new FormControl(''),
      re_password: new FormControl(''),
      gender: new FormControl(''),
      role:new FormControl('')
    })
  }
  onSubmit(){
    // console.log(this.registerForm.value);
    
    this._userService.addUser(this.registerForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        // console.log(res.email);
        
        this._userloginService.addUserLogin(res.email,res.password,res.role).subscribe({
          next:(res1)=>{
            console.log(res1);
            
          },
          error:(err1)=>{
            console.log(err1);
            
          }
        })
        this.router.navigate(['']);
        const dialogRef = this._dialogref.open(LoginComponent);
      },
      error:(err)=>{
        console.log(err);
        this.snackBar.open(err.error, 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
      }
    })
    
  }

  onLogin(){
    const dialogRef = this._dialogref.open(LoginComponent);
    // this.router.navigate(['/login']);
  }
}
