import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private _http:HttpClient) { }

  getMenu():Observable<any>{
    return this._http.get('https://localhost:7122/api/Menu/getmenu');
  }

  deleteMenu(id:any):Observable<any>{
    return this._http.delete(`https://localhost:7122/api/Menu/deletebyid/${id}`);
  }

  addMenu(data:any):Observable<any>{
    return this._http.post('https://localhost:7122/api/Menu/addmenu',data);
  }
  
  updateMenu(id:any,data:any):Observable<any>{
    return this._http.put(`https://localhost:7122/api/Menu/updateMenu/${id}`,data);
  }
}
