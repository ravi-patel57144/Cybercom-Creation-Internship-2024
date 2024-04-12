import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () =>
      import('./module/user/user.module').then((m) => m.UserModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./module/product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./module/categories/categories.module').then(
        (m) => m.CategoriesModule
      ),
  },
  // Add any other routes here if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
