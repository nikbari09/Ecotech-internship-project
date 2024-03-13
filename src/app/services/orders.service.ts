import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  time='';
  // date='';

  constructor(private _http:HttpClient) { }

  addOrder(data:any):Observable<any>{
    data.time=this.time;
    const currentDate = new Date();
    const dateOnly = currentDate.toISOString().split('T')[0];
    data.date=dateOnly;
    return this._http.post('https://localhost:7122/api/Orders/addOrder',data);
  }

  getOrder():Observable<any>{
    return this._http.get('https://localhost:7122/api/Orders/getOrders');
  }

  updateStatus(id:any,data:any):Observable<any>{
    return this._http.put(`https://localhost:7122/api/Orders/updateStatus/${id}`,data);
  }

}
