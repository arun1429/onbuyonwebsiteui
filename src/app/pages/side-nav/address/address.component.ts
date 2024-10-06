import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  addEditAddress: boolean = false;
  address: any;

  constructor() { }

  ngOnInit(): void { }

  getAddressFormChangeEvent(e) {
    if(!e){
      this.address=''
    }
    this.addEditAddress = !this.addEditAddress;
  }
  sendEditAddress(e) {
    this.address = e;
  }

}
