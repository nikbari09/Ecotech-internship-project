import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token!:any;
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const keys= Object.keys(localStorage);
    for(const key of keys)
    {
      if(key === 'usertoken')
      {
        this.token=localStorage.getItem(key);
      }
      else if(key === 'admintoken')
      {
        this.token=localStorage.getItem(key);
      }
    }
    
    if (this.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${JSON.parse(this.token)}`
        }
      });
    }
    return next.handle(request);
  }
}
