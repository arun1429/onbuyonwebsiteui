import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchProductsComponent } from './search-products.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Search'
    },
    children: [
      { path: "", component: SearchProductsComponent, data: { title: 'Search' } },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchProductsRoutingModule { }
