import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../../core/services/product.service';
import { CategoryService } from '../../../../core/services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  categories: any;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories() {
    this.categoryService.fetchCategories().subscribe({
      next: (res: any) => {
        console.log(res);
        this.categories = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      let newProduct = {
        title: this.productForm.value.name,
        price: this.productForm.value.price,
        description: this.productForm.value.description,
        categoryId: parseInt(this.productForm.value.category),
        images: [this.productForm.value.image],
      };

      this.productService.addProduct(newProduct).subscribe({
        next: (res) => {
          console.log(res);
          console.log('Product added');
          alert('Product added successfully!')
          this.router.navigate(['/']);

        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      console.log('Form is invalid!');
    }
  }
}
