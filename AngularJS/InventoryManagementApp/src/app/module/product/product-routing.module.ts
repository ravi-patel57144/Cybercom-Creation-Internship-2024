import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { FetchProductComponent } from './components/fetch-product/fetch-product.component';

const routes: Routes = [
  {
    path: '',
    component: FetchProductComponent,
  },
  {
    path: 'add',
    component: AddProductComponent,
  },
  {
    path: 'update/:id',
    component: UpdateProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
