import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // role:string='user';

  constructor(private _http:HttpClient) { 
  }

  addUser(data:any):Observable<any>{
    data.role='user';
    // const body={data,setrole:this.role}
    return this._http.post('http://localhost:3000/users',data);
  }

  getUser():Observable<any>{
    return this._http.get('http://localhost:3000/users');
  }
}
