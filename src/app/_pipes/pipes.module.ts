import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe, SafePipe, SortingPipe } from './index';

@NgModule({
  declarations: [FilterPipe, SortingPipe,SafePipe],
  imports: [
    CommonModule
  ],
  exports:[SortingPipe, FilterPipe,SafePipe]
})
export class PipesModule { }
