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
    return this._http.post('https://localhost:7122/api/User/addUsers',data);
  }

  getUser():Observable<any>{
    return this._http.get('https://localhost:7122/api/User/getUsers');
  }

  updatePassword(id:any, data:any):Observable<any>{
    return this._http.put(`https://localhost:7122/api/User/updatepassword/${id}`,data);
  }
}
