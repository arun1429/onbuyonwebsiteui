import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule ,FormsModule } from "@angular/forms";
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from 'src/app/_pipes/pipes.module';
import { BuyOneRoutingModule } from './buyone-product-routing.module';
import { BuyoneProductsComponent } from './buyone-products.component';
@NgModule({
  declarations: [BuyoneProductsComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    BuyOneRoutingModule,
    ReactiveFormsModule,
    PipesModule,
    FormsModule ,
    NgSelectModule,
   
  ]
})
export class BuyOneModule { }
