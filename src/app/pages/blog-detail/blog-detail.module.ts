import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule ,FormsModule } from "@angular/forms";
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from 'src/app/_pipes/pipes.module';
import { BlogDetailComponent } from './blog-detail.component';
import { BlogDetailRoutingModule } from './blog-detail-routing.module';
@NgModule({
  declarations: [BlogDetailComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    BlogDetailRoutingModule,
    ReactiveFormsModule,
    PipesModule,
    FormsModule ,
    NgSelectModule,
   
  ]
})
export class BlogDetailModule { }
