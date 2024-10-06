import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule ,FormsModule } from "@angular/forms";
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from 'src/app/_pipes/pipes.module';
import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog-routing.module';
@NgModule({
  declarations: [BlogComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    BlogRoutingModule,
    ReactiveFormsModule,
    PipesModule,
    FormsModule ,
    NgSelectModule,
   
  ]
})
export class BlogModule { }
