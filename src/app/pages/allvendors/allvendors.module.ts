import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule ,FormsModule } from "@angular/forms";
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from 'src/app/_pipes/pipes.module';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AllVendorsComponent } from './allvendors/allvendors.component';
import { AllVendorsRoutingModule } from './allvendors-routing.module';
@NgModule({
  declarations: [AllVendorsComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    AllVendorsRoutingModule,
    ReactiveFormsModule,
    PipesModule,
    FormsModule ,
    NgxSliderModule,
    NgSelectModule,
    CarouselModule
  ]
})
export class AllVendorsModule { }
