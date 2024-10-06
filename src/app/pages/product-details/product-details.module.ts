import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule ,FormsModule } from "@angular/forms";
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from 'src/app/_pipes/pipes.module';
import { ProductDetailsComponent } from './product-details.component';
import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    ProductDetailsRoutingModule,
    ReactiveFormsModule,
    PipesModule,
    FormsModule ,
    NgSelectModule,
    CarouselModule,
    NgxSliderModule
  ]
})
export class ProductDetailsModule { }
