import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import { CategoryService } from '../../../../core/services/category.service';

@Component({
  selector: 'app-fetch-product',
  templateUrl: './fetch-product.component.html',
})
export class FetchProductComponent implements OnInit {
  products: any;
  categories: any;
  isLoading: boolean = false;

  showModal: boolean = false;
  productToDeleteId: number | null = null;

  id: any;

  searchQuery: string = '';
  selectedCategory: string = '';
  selectedPriceFilter: string = '';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('id')!);
    this.fetchCategories();
    this.fetchProducts();
  }

  fetchCategories() {
    this.categoryService.fetchCategories().subscribe({
      next: (data) => {
        this.categories = data;
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  fetchProducts() {
    this.isLoading = true;
    this.productService.fetchProducts().subscribe({
      next: (product) => {
        this.isLoading = false;
        this.products = product;
        console.log(product);
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      },
    });
  }

  deleteProduct(id: number) {
    let status = confirm('Are you sure you want to delete?');
    if (status) {
      this.productService.deleteProduct(id).subscribe({
        next: (res) => {
          console.log(res);
          this.fetchProducts();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  updateNavigation(id: number) {
    this.router.navigate([`/update/${id}`]);
  }
}
