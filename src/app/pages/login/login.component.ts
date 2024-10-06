import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterModule } from '@angular/router';
import { MetakeywordsService } from '../../_services/metakeywords.service';
import { SEOService } from '../../_services/seo.service';
import { CommonModule } from '@angular/common';
import { AlertService, UserService } from 'src/app/_services';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Location } from '@angular/common';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { LoginService } from 'src/app/services/login.service';
interface User {
  mobileNo: string;
  loginType: string;
  userId: string;
  token: string;
  fullName: string;
  profilePic: string;
  shopName:string;
  userEmailId: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  fieldTextType: boolean;
  loginForm: FormGroup;
  step: number = 1;
  otpForm: FormGroup;
  constructor(
    public _AS: AlertService,
    private _LGS: LoginService,
    private _US: UserService,
    //private authService: SocialAuthService,
    private location: Location,@Inject(PLATFORM_ID) private platformId: Object,
    private _FB: FormBuilder,private seoService: SEOService,private updateMetaTagSrv:MetakeywordsService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this._FB.group({
      loginId: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.otpForm = this._FB.group({
      otp: ["", Validators.required]
    })
    this.seoService.updateCanonicalUrl('https://onbuyon.in/login')
    this.updateMetaTagSrv.getSeoContent('Login Page').subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.updateMetaTagSrv.updateMetaKeywords(data.data.title,data.data.description,data.data.keywords,"https://onbuyon.in/login",data.data.imageUrl)
        }
      }
    )
   
    // this.authService.authState.subscribe(res=>{
    //   let obj={
    //     loginType:'google',
    //     userName:res.firstName,
    //     lastName:res.lastName,
    //     fullName:res.firstName+" "+res.lastName,
    //     oauth_uid:res.id,
    //     userEmailId:res.email,
    //     mobileNumber:"",
    //     shopName : "All",
    //     deviceToken:""
    //   }
    //   this._LGS.socialLogin(obj).subscribe(res=>{
    //     if(res['meta']['status']){
    //       const user: User = {
    //         fullName: res['data'] && res['data'].fullName ? res['data'].fullName : 'Guest',
    //         mobileNo: res['data'].mobileNo,
    //         loginType: res['data'].loginType,
    //         userId: res['data'].userId,
    //         token: res['token'],
    //         shopName : "All",
    //         userEmailId:res['data'].userEmailId,
    //         profilePic: res['data'].profilePic ? res['data'].profilePic : 'https://res.cloudinary.com/appindia/image/upload/v1567572166/uploads/profile_d7wqbt.svg'
    //       };
    //       this.afterLogin1(user);
    //     }
    //   })
    // })
  }


  afterLogin1(user) {
    this.setLocalStorage1(user);
    this._US.updateUser(true, user);
    this.location.back();
  }

  setLocalStorage1(user: any) {
    if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    }
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  signInWithGoogle(): void {
  //  this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
  }

  signOut(): void {
   // this.authService.signOut();
  }





  login() {
    if (this.loginForm.valid) {
      this._LGS.login(this.loginForm.value).subscribe(
        (data: any) => {
          if (data.meta.status) {
            const user: User = {
              fullName: data.data && data.data.fullName ? data.data.fullName : 'Guest',
              mobileNo: data.data.mobileNo,
              loginType: data.data.loginType,
              userId: data.data.userId,
              token: data.token,
              shopName : "All",
              userEmailId: data.data.userEmailId,
              profilePic: data.data.profilePic ? data.data.profilePic : 'https://res.cloudinary.com/appindia/image/upload/v1567572166/uploads/profile_d7wqbt.svg'
            };
            this.afterLogin(user);
            //this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
          } else {
            //this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
          }
        }
      )
    }
  }

  afterLogin(user) {
    this.setLocalStorage(user);
    this._US.updateUser(true, user);
    this.router.navigateByUrl("/");
  }

  setLocalStorage(user: any) {
    if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    }
  }
  otpVerify() {
    if (this.otpForm.valid) {
      const otpData = {
        ...this.otpForm.value,
        mobileNo: +this.loginForm.value.mobileNo
      };
      this._LGS.otpVerify(otpData).subscribe(
        (data: any) => {
          if (data.meta.status) {
            const userOtp: User = {
              fullName: data.data && data.data.fullName ? data.data.fullName : 'Guest',
              mobileNo: data.data.mobileNo,
              loginType: data.data.loginType,
              userId: data.data.userId,
              token: data.token,
              shopName : "All",
              userEmailId: data.data.userEmailId,
              profilePic: data.data.profilePic ? data.data.profilePic : 'https://res.cloudinary.com/appindia/image/upload/v1567572166/uploads/profile_d7wqbt.svg'
            };
            this.afterLoginOtp(userOtp);
            //this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
          } else {
            //this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
          }
        }
      )
    }
  }

  afterLoginOtp(user) {
    this.setLocalStorageOtp(user);
    this._US.updateUser(true, user);
    this.location.back();
  }

  setLocalStorageOtp(user: any) {
    if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    }
  }

  loginOtp() {
    this._LGS.login(this.loginForm.value).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.otpForm.patchValue({ otp: data.otp });
          //this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
        } else {
          //this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
        }
      }
    )
  }

}
