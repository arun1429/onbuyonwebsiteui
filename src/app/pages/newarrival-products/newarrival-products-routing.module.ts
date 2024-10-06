import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewarrivalProductsComponent } from './newarrival-products.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'New Arrival'
    },
    children: [
      { path: "", component: NewarrivalProductsComponent, data: { title: 'New Arrival' } },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewArrivalProductsRoutingModule { }
