import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../../core/services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
})
export class UpdateCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  categoryId: number | undefined;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.categoryId = +this.route.snapshot.paramMap.get('id')!;
    this.fetchCategoryById(this.categoryId);
  }

  fetchCategoryById(categoryId: number) {
    this.categoryService.fetchCategoryById(categoryId).subscribe({
      next: (res: any) => {
        this.categoryForm.setValue({
          name: res.name,
          image: res.image,
        });
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      let newCategory = {
        name: this.categoryForm.value.name,
        image: this.categoryForm.value.image,
      };

      this.categoryService
        .updateCategories(this.categoryId, newCategory)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.toastr.success('Category updated successfully!')
            this.router.navigate(['/categories']);
          },
          error: (err) => {
            console.log(err);
            this.toastr.warning('Something went wrong!')
          },
        });

      console.log(newCategory);
    } else {
      console.log('Form is invalid!');
    }
  }
}
