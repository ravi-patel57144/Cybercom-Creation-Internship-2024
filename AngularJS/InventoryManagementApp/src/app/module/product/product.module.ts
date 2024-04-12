import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FetchProductComponent } from './components/fetch-product/fetch-product.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';

@NgModule({
  declarations: [
    FetchProductComponent,
    AddProductComponent,
    UpdateProductComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class ProductModule {}
