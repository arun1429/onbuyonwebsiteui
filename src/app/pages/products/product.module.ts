import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProductRoutingModule } from './product-routing.module';
import { ReactiveFormsModule ,FormsModule } from "@angular/forms";
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductsComponent } from './products.component';
import { PipesModule } from 'src/app/_pipes/pipes.module';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    PipesModule,
    FormsModule ,
    NgSelectModule,
    NgxSliderModule
  ]
})
export class ProductModule { }
