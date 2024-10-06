import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AlertService, UserService } from 'src/app/_services';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css'],
})
export class AddressListComponent  implements OnInit {
  isDefault: boolean;
  addresses: any = [];
  addressFormChanged: boolean;
  @Output() getAddressFormChangeEvent = new EventEmitter();
  @Output() getAddressIsDefault = new EventEmitter();
  @Output() sendEditAddress = new EventEmitter();

  constructor(private _CHS: HomeService, public _AS: AlertService) {
    
  }

  ngOnInit(): void {
    this.getAddresses();
  }

  getAddresses() {
    this._CHS.getAddress().subscribe((data: any) => {
      if (data.meta.status) {
        this.addresses = data.data.address;
        this.addresses.map((val) => {
          if (val.isDefault === true) {
            this.isDefault = true;
            this.getAddressIsDefault.emit(this.isDefault);
          } else {
            this.isDefault = false;
            this.getAddressIsDefault.emit(this.isDefault);
          }
        });
      } else {
        this.addresses = [];
      }
    });
  }

  goToAddAddress() {
    this.getAddressFormChangeEvent.emit(false);
  }
  
  deleteAddress(addressId) {
    this._CHS.deleteAddress(addressId).subscribe((data: any) => {
      if (data.meta.status) {
        this.getAddresses();
        // this.alertMessage({
        //   type: 'success',
        //   title: 'Success',
        //   value: data.meta.msg,
        // });
      } else {
        // this.alertMessage({
        //   type: 'danger',
        //   title: 'Error Occured',
        //   value: data.meta.msg,
        // });
      }
    });
  }
  goToEdit(address) {
    this.sendEditAddress.emit(address);
    this.getAddressFormChangeEvent.emit(true);
  }
}
