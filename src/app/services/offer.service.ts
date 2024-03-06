import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private _http:HttpClient) { }

  getOffer():Observable<any>{
    return this._http.get('http://localhost:3000/offers');
  }

  deleteOffer(id:any):Observable<any>{
    return this._http.delete(`http://localhost:3000/offers/${id}`);
  }
}
