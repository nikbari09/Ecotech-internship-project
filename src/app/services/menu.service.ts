import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private _http:HttpClient) { }

  getMenu():Observable<any>{
    return this._http.get('http://localhost:3000/menu');
  }

  deleteMenu(id:any):Observable<any>{
    return this._http.delete(`http://localhost:3000/menu/${id}`);
  }

  addMenu(data:any):Observable<any>{
    return this._http.post('http://localhost:3000/menu',data);
  }
  
  updateMenu(id:any,data:any):Observable<any>{
    return this._http.put(`http://localhost:3000/menu/${id}`,data);
  }
}
