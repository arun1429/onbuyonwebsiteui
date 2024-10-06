import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { VendorProductRoutingModule } from './vendor-product-routing.module';
import { ReactiveFormsModule ,FormsModule } from "@angular/forms";
import { NgxPaginationModule } from 'ngx-pagination';
import { VendorProductsComponent } from './vendor-products.component';
import { PipesModule } from 'src/app/_pipes/pipes.module';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CarouselModule } from 'ngx-owl-carousel-o';
@NgModule({
  declarations: [VendorProductsComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    VendorProductRoutingModule,
    ReactiveFormsModule,
    PipesModule,
    FormsModule ,
    NgxSliderModule,
    NgSelectModule,
    CarouselModule
  ]
})
export class VendorProductModule { }
