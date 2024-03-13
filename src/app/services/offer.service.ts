import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private _http:HttpClient) { }

  getOffer():Observable<any>{
    return this._http.get('https://localhost:7122/api/Offers/getOffers');
  }

  deleteOffer(id:any):Observable<any>{
    return this._http.delete(`https://localhost:7122/api/Offers/deletebyid/${id}`);
  }

  addOffer(data:any):Observable<any>{
    return this._http.post('https://localhost:7122/api/Offers/addoffer',data);
  }

  updateOffer(id:any,data:any):Observable<any>{
    return this._http.put(`https://localhost:7122/api/Offers/updateOffer/${id}`,data);
  }
}
