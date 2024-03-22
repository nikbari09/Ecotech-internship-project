import { query } from '@angular/animations';
import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { UserLoginService } from 'src/app/services/user-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _userloginService:UserLoginService,
    private router:Router,
    private _dialogref:MatDialogRef<LoginComponent>){}

  loginForm:FormGroup=new FormGroup({});
  paraty:boolean=false;
 

  ngOnInit(){
    this.loginForm= new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }

  login(): void {
    this._userloginService.getUserLogin().subscribe({
      next:(res)=>{
        const userFound = res.filter( (val:any) => val.email === this.loginForm.value.email && val.password === this.loginForm.value.password)
        // for(let val of res){
        //   this.paraty=false;
        //   if(this.loginForm.value.email === val.email && this.loginForm.value.password === val.password){
        //     this._userloginService.getSingleUser(val.id).subscribe({
        //       next:(res1)=>{
        //         if(this.loginForm.value.email === res1.email && this.loginForm.value.password === res1.password){
        //           // console.log("hello user");
        //           this.paraty=true;
        //           // console.log(this.paraty);
        //           this.router.navigate(['/dashboard']);
        //           this._dialogref.close();

        //         }
        //       },
        //       error:(err1)=>{
        //         console.log(err1);
                
        //       }
        //     })
        //     this.paraty=true;
        //     this.router.navigate(['/dashboard']);
        //     this._dialogref.close();
        //   }
        // }
        if(userFound.length>0){
          // console.log(userFound);
          // console.log(userFound[0].email);
          
          
          // console.log(userFound[0].id);
          //this code is for the user and admin dashboard if the dashboard are different.
          // if(userFound[0].role === 'user')
          // {
          //   this.router.navigate(['/dashboard']);
          //   this._userloginService.email=userFound[0].email;
          //   // console.log(this._userloginService.email);
          //   localStorage.setItem('user',JSON.stringify(userFound));
          
          //   this._dialogref.close();
          // }
          // else if(userFound[0].role === 'admin')
          // {
          //   this.router.navigate(['/dashboard']);
          //   this._userloginService.email=userFound[0].email;
          //   localStorage.setItem('admin',JSON.stringify(userFound));
          //   this._dialogref.close();
          // }
          
          this._userloginService.email=userFound[0].email;
          // console.log(this._userloginService.email);
          //localStorage.setItem('user',JSON.stringify(userFound));
          if(userFound[0].role === 'user'){
            this._userloginService.login(userFound[0]).subscribe({
              next:(res)=>{
                // console.log(res);
                
                localStorage.setItem('usertoken',JSON.stringify(res.token));
              },
              error:(err)=>{
                console.log(err);
                
              }
            })
            localStorage.setItem('user',JSON.stringify(userFound));
            this.router.navigate(['/dashboard/home']);
          }
          else if(userFound[0].role === 'admin')
          {
            this._userloginService.login(userFound[0]).subscribe({
              next:(res)=>{
                localStorage.setItem('admintoken',JSON.stringify(res.token));
              },
              error:(err)=>{
                console.log(err);
                
              }
            })
            localStorage.setItem('admin',JSON.stringify(userFound));
            this.router.navigate(['/dashboard/home']);

          }
          this._dialogref.close();
          
        }
        else{
          alert('Invalid email or password...');
        }
      },
      error:(err)=>{
        console.log(err);
        
      }
    });
  }
}
