import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule ,FormsModule } from "@angular/forms";
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from 'src/app/_pipes/pipes.module';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    PipesModule,
    FormsModule ,
    NgSelectModule,
   
  ]
})
export class LoginModule { }
