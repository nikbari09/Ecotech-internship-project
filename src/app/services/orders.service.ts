import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _http:HttpClient) { }

  addOrder(data:any):Observable<any>{
    return this._http.post('http://localhost:3000/orders',data);
  }

  getOrder():Observable<any>{
    return this._http.get('http://localhost:3000/orders');
  }

  updateStatus(id:any,data:any):Observable<any>{
    return this._http.put(`http://localhost:3000/orders/${id}`,data);
  }
}
