import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';
import { UsersService } from 'src/app/services/users.service';
import { AddMenuComponent } from '../add-menu/add-menu.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(
    private _userService:UsersService,
    private _menuService:MenuService,
    private router:Router,
    private _dialog:MatDialog
  ){}
  firstname!:string;
  lastname!:string;
  email!:string;
  role!:string;
  menu !:any;

  ngOnInit()
  {
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
    this._userService.getUser().subscribe({
      next:(res)=>{
        for(let val of res){
          if(this.email === val.email){
            this.firstname=val.firstname;
            // console.log('name',val.firstname);
            this.lastname=val.lastname;
          }
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })

    this._menuService.getMenu().subscribe({
      next:(res)=>{
        console.log(res);
        this.menu=res;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  OnaddCart(items:any){
    // console.log(items);
    localStorage.setItem('item',JSON.stringify(items)as any);
    this.router.navigate(['/dashboard/cart']);
  }

  onEdit(data:any){
    const dialogref=this._dialog.open(AddMenuComponent,{data});
    console.log(data.id);
    
  }

  onDelete(id:any){
    this._menuService.deleteMenu(id).subscribe({
      next:(res)=>{
        window.location.reload();
      },
      error:(err)=>{

      }
    })
  }
  
  addMenu(){
    // this.router.navigate(['/add-menu']);
    this._dialog.open(AddMenuComponent);
  }
}
