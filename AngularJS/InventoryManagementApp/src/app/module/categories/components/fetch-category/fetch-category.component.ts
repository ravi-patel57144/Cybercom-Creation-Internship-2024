import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../../../core/services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fetch-category',
  templateUrl: './fetch-category.component.html',
})
export class FetchCategoryComponent implements OnInit {
  categories: any;
  isLoading: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories() {
    this.isLoading = true;
    this.categoryService.fetchCategories().subscribe({
      next: (res) => {
        this.isLoading = false;
        console.log(res);
        this.categories = res;
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      },
    });
  }

  deleteCategory(id: number) {
    let status = confirm('Are you sure you want to delete this category?');
    if (status) {
      this.categoryService.deleteCategories(id).subscribe({
        next: (res) => {
          console.log(res);
          this.toastr.error('Category deleted successfully!')
          this.fetchCategories();
        },
        error: (err) => {
          console.log(err);
          this.toastr.warning('Something went wrong!')
        },
      });
    }
  }

  editNavigation(id: number) {
    console.log(id);
    this.router.navigate([`categories/update/${id}`]);
  }
}
