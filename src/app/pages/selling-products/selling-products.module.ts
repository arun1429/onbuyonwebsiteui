import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule ,FormsModule } from "@angular/forms";
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from 'src/app/_pipes/pipes.module';
import { SellingProductsComponent } from './selling-products.component';
import { SellingProductsRoutingModule } from './selling-products-routing.module';
@NgModule({
  declarations: [SellingProductsComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    SellingProductsRoutingModule,
    ReactiveFormsModule,
    PipesModule,
    FormsModule ,
    NgSelectModule,
   
  ]
})
export class SellingProductsModule { }
