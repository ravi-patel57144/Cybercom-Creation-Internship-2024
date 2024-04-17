import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import { CategoryService } from '../../../../core/services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
})
export class UpdateProductComponent implements OnInit {
  productForm: FormGroup;
  productId: number | undefined;
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: [''],
    });
  }

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    this.fetchProductById(this.productId);
    this.fetchCategories();
  }

  fetchProductById(id: number) {
    this.productService.fetchProductById(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.productForm.patchValue({
          name: res.title,
          price: res.price,
          description: res.description,
          category: res.category.id,
          image: res.images,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
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

  onUpdate() {
    if (this.productForm.valid) {
      let updatedProduct = {
        title: this.productForm.value.name,
        price: this.productForm.value.price,
        description: this.productForm.value.description,
        categoryId: parseInt(this.productForm.value.category),
        images: [this.productForm.value.image],
      };

      console.log(updatedProduct);

      this.productService
        .updateProduct(this.productId, updatedProduct)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.toastr.success('Product updated successfully!');
            this.router.navigate(['/']);

          },
          error: (err) => {
            console.log(err);
            this.toastr.warning('Something went wrong!');
          },
        });

      console.log(updatedProduct);
    } else {
      console.log('Form is invalid!');
    }
  }
}
