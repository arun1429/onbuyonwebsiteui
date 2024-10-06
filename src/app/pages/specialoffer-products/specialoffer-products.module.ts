import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule ,FormsModule } from "@angular/forms";
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from 'src/app/_pipes/pipes.module';
import { SpecialOfferProductsComponent } from './specialoffer-products.component';
import { SpecialOfferProductsRoutingModule } from './specialoffer-products-routing.module';
@NgModule({
  declarations: [SpecialOfferProductsComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    SpecialOfferProductsRoutingModule,
    ReactiveFormsModule,
    PipesModule,
    FormsModule ,
    NgSelectModule,
   
  ]
})
export class SpecialOfferProductsModule { }
