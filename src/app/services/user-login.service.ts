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
    return this._http.post('http://localhost:3000/user-login',body);
  }

  getUserLogin():Observable<any>{
    return this._http.get('http://localhost:3000/user-login');
  }

}
