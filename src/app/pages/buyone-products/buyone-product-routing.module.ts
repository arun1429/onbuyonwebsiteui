import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyoneProductsComponent } from './buyone-products.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Buy One'
    },
    children: [
      { path: "", component: BuyoneProductsComponent, data: { title: 'Buy One' } },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyOneRoutingModule { }
