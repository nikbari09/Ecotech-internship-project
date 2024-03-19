import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifyOfferService {
  constructor(private _http:HttpClient) { }
  setCount(count:any):Observable<any>{
    return this._http.post('https://localhost:7122/api/OfferCount/addOffercount',{count});
  }

  getCount():Observable<any>{
    return this._http.get('https://localhost:7122/api/OfferCount/getOffercount');
  }
  
  deleteCount(id:any):Observable<any>{
    return this._http.delete(`https://localhost:7122/api/OfferCount/deleteCount/${id}`);  
  }
}
