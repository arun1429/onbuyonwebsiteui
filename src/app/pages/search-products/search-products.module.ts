import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule ,FormsModule } from "@angular/forms";
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from 'src/app/_pipes/pipes.module';
import { SearchProductsComponent } from './search-products.component';
import { SearchProductsRoutingModule } from './search-products-routing.module';
@NgModule({
  declarations: [SearchProductsComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    SearchProductsRoutingModule,
    ReactiveFormsModule,
    PipesModule,
    FormsModule ,
    NgSelectModule,
   
  ]
})
export class SearchProductsModule { }
