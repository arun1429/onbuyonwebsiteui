import { Component, OnInit } from '@angular/core';

import { AlertService } from 'src/app/_services';
import { StartService } from 'src/app/services/start.service';
import { Validators, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,RouterModule,CommonModule,RouterModule],
})
export class RegisterComponent  implements OnInit {
  fieldTextType: boolean;

  registerFormGroup: FormGroup;

  constructor(
    public _AS: AlertService,
    private _FB: FormBuilder,
    private _RS: StartService,
    private router: Router
  ) {
    
    this.registerFormGroup = this._FB.group({
      userName: ['', ''],
      userEmailId: ['', ''],
      shopName: ['All', ''],
      mobileNo: ['', Validators.required],
      password: ['', Validators.required],
      fullName: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  register() {
    if (this.registerFormGroup.valid) {
      this._RS.register(this.registerFormGroup.value).subscribe(
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
