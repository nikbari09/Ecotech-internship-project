import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }

  getTime():string{
    const currentDate=new Date();
    const currentTime=currentDate.toLocaleTimeString();
    return currentTime;
  }
}
