import { Component, OnInit, AfterViewInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_services';
import { Options } from '@angular-slider/ngx-slider';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-allvendors',
  templateUrl: './allvendors.component.html',
  styleUrls: ['./allvendors.component.css']
})
export class AllVendorsComponent implements OnInit {
  allvendors: any = [];
  constructor(
    public _AS: AlertService,
    private _HS: HomeService,
    private router: Router) {
   
  }

  ngOnInit(): void {
    this.getVendorsList();
  }
  getVendorsList() {
    this._HS.getVendorsList().subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.allvendors = data.data;
        } else {
          // this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
        }
      }
    )
  }


  viewVendor(shopName) {
    this.router.navigateByUrl("/vendors/"+shopName);
  }
}
