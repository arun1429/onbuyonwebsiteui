import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_services';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { StartService } from 'src/app/services/start.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,RouterModule,CommonModule,RouterOutlet],
})
export class FooterComponent  implements OnInit {

  groups: any = [];
  allFooterList: any = [];
  contactUsForm: FormGroup;
  contactDetails: any;
  socialDetails: any;
  shopName: string="All";
  constructor(public _AS: AlertService, private _SS: StartService, private _FB: FormBuilder, 
    private routes: ActivatedRoute,
    private router: Router,@Inject(PLATFORM_ID) private platformId: Object) {
    
  }

  ngOnInit(): void {
    this.shopName = "All"
    this.getAllGroups();
    this.getSocialDetails()
    this.getContactDetails();
    if (isPlatformBrowser(this.platformId)) {
    this.shopName  = localStorage.getItem("shopName")
    console.log("fotter shop"+localStorage.getItem("shopName"))
    localStorage.setItem("shopName",this.shopName)
    }
    this.getAllGroups();
    this.getContactDetails();
    this.getFooterKeywords();
    this.contactUsForm = this._FB.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  getContactDetails() {
    this._SS.getContactDetails(this.shopName).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.contactDetails = data.data;
        }
      }
    )
  }
  getFooterKeywords() {
    this._SS.getFooterKeywords(this.shopName).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.allFooterList = data.data;
        }
      }
    )
  }
  
  getSocialDetails() {
    this._SS.getSocialMediaDetails(this.shopName).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.socialDetails = data.data;
        }
      }
    )
  }
  
  getAllGroups() {
    this._SS.getGroups().subscribe(
      data => {
        if (data && data.length) {
          this.groups = data
        }
      }
    )
  }

  contactUs() {
    if (this.contactUsForm.valid) {
      this._SS.contactUs(this.contactUsForm.value,this.shopName).subscribe(
        (data: any) => {
          if (data.meta.status) {
            //this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
            this.contactUsForm.reset();
            window.scrollTo(0, 0);
          }
          else {
            //this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
          }
        }
      )
    }
  }

}
