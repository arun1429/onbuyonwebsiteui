import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule ,FormsModule } from "@angular/forms";
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from 'src/app/_pipes/pipes.module';
import { CheckoutComponent } from './checkout.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    CheckoutRoutingModule,
    ReactiveFormsModule,
    PipesModule,
    FormsModule ,
    NgSelectModule,
   
  ]
})
export class CheckoutModule { }
