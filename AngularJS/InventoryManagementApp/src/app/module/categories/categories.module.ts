import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesRoutingModule } from './categories-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { FetchCategoryComponent } from './components/fetch-category/fetch-category.component';
import { UpdateCategoryComponent } from './components/update-category/update-category.component';

@NgModule({
  declarations: [
    AddCategoryComponent,
    FetchCategoryComponent,
    UpdateCategoryComponent,
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class CategoriesModule {}
