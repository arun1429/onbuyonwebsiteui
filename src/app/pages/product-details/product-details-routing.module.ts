import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailsComponent } from './product-details.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Product Details'
    },
    children: [
      { path: ":variantSlug", component: ProductDetailsComponent, data: { title: 'Product Details' } },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductDetailsRoutingModule { }
