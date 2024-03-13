import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  email!:string;
  role='user';

  constructor(private _http:HttpClient) { }

  addUserLogin(email:string,password:string,role:string):Observable<any>{
    const body={email,password,role};
    return this._http.post('https://localhost:7122/api/User_Login',body);
  }

  getUserLogin():Observable<any>{
    return this._http.get('https://localhost:7122/api/User_Login/getuser_login');
  }

  updateUserPassword(id:any, data:any):Observable<any>{
    return this._http.put(`https://localhost:7122/api/User_Login/updateuserLoginpassword/${id}`,data);
  }

}
