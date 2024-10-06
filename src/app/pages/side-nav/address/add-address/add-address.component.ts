import { Component, OnInit, Output, EventEmitter, Input, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AlertService, UserService } from 'src/app/_services';

import { NgxSpinnerService } from 'ngx-spinner';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent  implements OnInit {

  addressForm: FormGroup;
  selectedAdd: boolean = false;
  addressString: any;
  @Output() emitSuccessFlagForAddress = new EventEmitter();
  @Input() address: any;
  geocoder: google.maps.Geocoder;
  states: any = [];
  cities: any = [];
  currentlng: any;
  currentlat: any;
  deliveryState: any
  deliveryCity: any
  constructor(
    private zone: NgZone,
    private fb: FormBuilder,
    public _AS: AlertService,
    private spinnerService: NgxSpinnerService,
    private _CHS: HomeService
  ) {
    
  }

  ngOnInit(): void {

   this.getStates();

    this.geocoder = new google.maps.Geocoder();
    this.addressForm = this.fb.group({
      fullName: [null, Validators.compose([Validators.required])],
      mobileNo: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      pinCode: [null, Validators.compose([Validators.required])],
      streetAddress: [null, Validators.compose([Validators.required])],
      userGst:[null],
      city: ['',  Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      country: ['', Validators.compose([Validators.required])],
      landmark: [null],
      alternateMobileNo: [null, Validators.compose([Validators.minLength(10), Validators.maxLength(10)])],
      addressType: [null, Validators.compose([Validators.required])]
    });
    if (this.address) {
      console.log(this.address)
      this._CHS.getStates().subscribe(
        (data: any) => {
          if (data && data.states) {
            this.states = data.states;
            this.states.map((_) => {
              if (this.address.state === _.state) {
                this.cities = _.districts;
              }
            })
            this.selectedAddress(this.address);
          }
        }
      )
    }
    else{
      this.getStates()
    }
    this.addressForm.controls.state.valueChanges.subscribe(data=>{

    })
  }

  getStates() {
    this._CHS.getStates().subscribe(
      (data: any) => {
        if (data && data.states) {
          this.states = data.states;
        }
      }
    )
  }
  chooseLocation(event) {

    if (event.target.checked) {
      this.spinnerService.show();
      navigator.geolocation.getCurrentPosition(pos => {
        this.currentlng = pos.coords.longitude;
        this.currentlat = pos.coords.latitude;
        this.spinnerService.hide();
        this.locateMe()
      });
    } else {
      this.addressForm.patchValue({ state: "" });
      this.addressForm.patchValue({ city: "" });
      this.addressForm.patchValue({ pinCode: "" });
      this.addressForm.patchValue({ streetAddress: "" });
      this.addressForm.patchValue({ country: "" });
      this.cities = [];
    }
  }
  plus_code = ""
  sublocality_level_3 = ""
  sublocality_level_2 = ""
  sublocality_level_1 = ""
  locateMe() {
    this.geocoder.geocode({ 'location': { lat: this.currentlat, lng: this.currentlng } }, (results, status) => {
      if (status === 'OK') {
       console.log( results[0].address_components)
        results[0].address_components.map(el => {
          // console.log(el)
          el.types.map(l => {
            if (l === "administrative_area_level_1") {
              this.deliveryState = el.long_name
              this.addressForm.patchValue({ state: this.deliveryState })
              let findState = this.states.find(t => t.state === this.deliveryState)
              this.cities = findState.districts
              this.spinnerService.hide();
            }
            if (l === 'locality' || l =='administrative_area_level_3') {
              this.deliveryCity = el.long_name
              this.addressForm.patchValue({ city: this.deliveryCity })
              this.spinnerService.hide();
            }
            
            if (l === 'postal_code') {
              this.addressForm.patchValue({ pinCode: el.long_name})
              this.spinnerService.hide();
            }
           
            if (l === 'plus_code' || l === 'premise')  {
              this.plus_code  = el.long_name
            }
            if (l === 'sublocality_level_3') {
              this.sublocality_level_3  = el.long_name
            }
            if (l === 'sublocality_level_2') {
              this.sublocality_level_2  = el.long_name
            }
            if (l === 'sublocality_level_1') {
              this.sublocality_level_1  = el.long_name
            }
            if (l === 'country') {
              this.addressForm.patchValue({ country: el.long_name})
              this.spinnerService.hide();
            }
            this.addressForm.patchValue({ streetAddress: this.plus_code + " "+this.sublocality_level_3+ " "+this.sublocality_level_2 + " "+this.sublocality_level_1})
          })
        })
      }
    });
  }
  chnageState(e) {
    this.states.map((_) => {
      if (e.target.value === _.state) {
        console.log(_)
        this.cities = _.districts;
      }
    })
  }

  selectedAddress(e) {
    this.addressForm.setValue({
      fullName: e.fullName,
      mobileNo: e.mobileNo,
      pinCode: e.pinCode,
      streetAddress: e.streetAddress,
      city: e.city,
      state: e.state,
      userGst:e.userGst,
      country: e.country,
      landmark: e.landmark,
      alternateMobileNo: e.alternateMobileNo,
      addressType: e.addressType
    });
    this.selectedAdd = true;
  }

  actionOnAddress(body) {
    const obj = this.formatObj(body);
    this.checkPinCode(obj);
  }

  checkPinCode(obj) {
    if (this.selectedAdd === false) {
      this.addressString = obj.streetAddress + " " + obj.city + " " + obj.state + " " + obj.country + " " + obj.pinCode;
      this.geocoder.geocode({ address: this.addressString }, (results, status) => {
        if (status == "OK") {
          obj["coordinates"] = [
            results[0].geometry.location.lng(),
            results[0].geometry.location.lat()
          ];
          obj.isDefault = false;
          this._CHS.addAddress(obj).subscribe(
            (data: any) => {
              this.zone.run(() => {
                if (data.meta.status == true) {
                  this.addressForm.reset();
                  this.emitValue();
                  //this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
                } else {
                  //this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
                }
              });
            }
          );
        }
      });
    }
    else {
      this.addressString = obj.streetAddress + " " + obj.city + " " + obj.state + " " + obj.country + " " + obj.pinCode;
      this.geocoder.geocode({ address: this.addressString }, (results, status) => {
        if (status == "OK") {
          obj["coordinates"] = [
            results[0].geometry.location.lng(),
            results[0].geometry.location.lat()
          ];
          obj.isDefault = false;
          obj.addressId = this.address.addressId
          this._CHS.editAddress(obj).subscribe(
            (data: any) => {
              this.zone.run(() => {
                if (data.meta.status == true) {
                  this.addressForm.reset();
                  this.emitValue();
                  //this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
                } else {
                  //this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
                }
              });
            }
          );
        }
      }
      );
    }
  }

  formatObj = body => {
    Object.keys(body).forEach(o => {
      if (body[o] == null || body[o] == undefined || body[o] == "") {
        delete body[o];
      }
    });
    return body;
  };

  emitValue() {
    this.selectedAdd = false;
    this.addressForm.reset();
    this.emitSuccessFlagForAddress.emit(true);
  }

}
