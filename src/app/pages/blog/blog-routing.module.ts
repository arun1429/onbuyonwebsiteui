import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './blog.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Blogs'
    },
    children: [
      { path: "", component: BlogComponent, data: { title: 'Blogs' } },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
