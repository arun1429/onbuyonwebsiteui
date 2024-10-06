import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule ,FormsModule } from "@angular/forms";
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from 'src/app/_pipes/pipes.module';
import { NewarrivalProductsComponent } from './newarrival-products.component';
import { NewArrivalProductsRoutingModule } from './newarrival-products-routing.module';
@NgModule({
  declarations: [NewarrivalProductsComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    NewArrivalProductsRoutingModule,
    ReactiveFormsModule,
    PipesModule,
    FormsModule ,
    NgSelectModule,
   
  ]
})
export class NewArrivalProductsModule { }
