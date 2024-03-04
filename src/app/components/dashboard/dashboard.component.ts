import { keyframes } from '@angular/animations';
import { coerceStringArray } from '@angular/cdk/coercion';
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';
import { UserLoginService } from 'src/app/services/user-login.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private _activatedrouter:ActivatedRoute,
    private _userService:UsersService,
    private _userloginService:UserLoginService,
    private router:Router){}
  firstname!:string;
  lastname!:string;
  email!:string;
  role!:any;
  
  ngOnInit(){
    // this is for getting role from localstorage.
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
    this._userService.getUser().subscribe({
      next:(res)=>{
        for(let val of res){
          // console.log(val);
          if(this.email === val.email){
            this.firstname=val.firstname;
            console.log('name',val.firstname);
            this.lastname=val.lastname;
          }
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  onLogout(){
    localStorage.removeItem('user');
    localStorage.removeItem('admin');
    this.router.navigate(['']);
  }
}
