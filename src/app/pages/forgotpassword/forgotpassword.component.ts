import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AlertService } from 'src/app/_services';
import { ForgotPasswordService } from 'src/app/services/forgotpassword.service';
import { MetakeywordsService } from '../../_services/metakeywords.service';
import { SEOService } from '../../_services/seo.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,RouterModule,CommonModule,RouterOutlet],
})
export class ForgotPasswordComponent  implements OnInit {
  fieldTextType: boolean;
  fieldTextType2: boolean;
  forgotpasswordFormGroup: FormGroup;
  verifyFormGroup: FormGroup;
  step: number = 1;
  constructor(
    public _AS: AlertService,
    private _FB: FormBuilder,
    private _RS: ForgotPasswordService,
    private router: Router,private updateMetaTagSrv:MetakeywordsService,private seoService: SEOService
  ) {
    
    this.forgotpasswordFormGroup = this._FB.group({
      mobileNo: ['', Validators.required],
    })
    this.verifyFormGroup = this._FB.group({
      mobileNo: ['', Validators.required],
      otp: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.updateMetaTagSrv.getSeoContent('Forgot Password').subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.updateMetaTagSrv.updateMetaKeywords(data.data.title,data.data.description,data.data.keywords,"https://onbuyon.in/forgot-password",data.data.imageUrl)
        }
      }
    )
    this.seoService.updateCanonicalUrl('https://onbuyon.in/forgot-password')
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  toggleFieldTextType2() {
    this.fieldTextType2 = !this.fieldTextType2;
  }
  sendOtp() {
    if (this.forgotpasswordFormGroup.valid) {
      var mobileNumber = this.forgotpasswordFormGroup.value.mobileNo
      const newOBject ={
        mobileNo: mobileNumber
      }
      this._RS.sendOtp(newOBject).subscribe(
        (data: any) => {
          if (data.meta.status) {
             this.step = 2
             this.verifyFormGroup.patchValue({ mobileNo:mobileNumber})
            //this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
          } else {
            //this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
          }
        }
      )
    }
  }
  reSendOtp() {
    if (this.verifyFormGroup.valid) {
      this._RS.sendOtp(this.forgotpasswordFormGroup.value).subscribe(
        (data: any) => {
          if (data.meta.status) {
             this.step = 2
             this.verifyFormGroup.patchValue({ mobileNo: this.forgotpasswordFormGroup.value.mobileNo})
            //this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
          } else {
            //this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
          }
        }
      )
    }
  }
  setnewPassword() {
    if (this.verifyFormGroup.valid) {
      if(this.verifyFormGroup.value.newPassword === this.verifyFormGroup.value.confirmPassword){
        this._RS.setnewPassword(this.verifyFormGroup.value).subscribe(
          (data: any) => {
            if (data.meta.status) {
              this.router.navigate(['/login']);
              //this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
            } else {
              //this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
            }
          }
        )
      }
      }
      
  }
}
