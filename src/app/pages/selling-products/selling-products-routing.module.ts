import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SellingProductsComponent } from './selling-products.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Selling Products'
    },
    children: [
      { path: "", component: SellingProductsComponent, data: { title: 'Selling Products' } },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellingProductsRoutingModule { }
