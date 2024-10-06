import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule ,FormsModule } from "@angular/forms";
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from 'src/app/_pipes/pipes.module';
import { WishListComponent } from './wishlist.component';
import { WishListRoutingModule } from './wishlist-routing.module';
@NgModule({
  declarations: [WishListComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    WishListRoutingModule,
    ReactiveFormsModule,
    PipesModule,
    FormsModule ,
    NgSelectModule,
   
  ]
})
export class WishListModule { }
