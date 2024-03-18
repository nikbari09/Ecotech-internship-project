import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  cafeAddress: string = "Vrindavan Regency, near bopdev ghat, yewalewadi, pune, 411043.";
  mobileNumber: string = "+91-7507008076";
  ownerName: string = "Nikhil Bari";
  ownerEmail: string = "nikbari09@example.com";
  ownerPhone: string = "+91-9156613345";
  cafeTiming: string="10:00 am to 11:00 pm (24*7)"

  constructor() { }

  ngOnInit(): void {
  }
}
