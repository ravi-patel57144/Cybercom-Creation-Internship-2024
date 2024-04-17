import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../../core/services/category.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
})
export class AddCategoryComponent {
  categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      let newCategory = {
        name: this.categoryForm.value.name,
        image: this.categoryForm.value.image,
      };

      this.categoryService.addCategories(newCategory).subscribe({
        next: (res) => {
          // console.log(res);
          this.toastr.success('Category added successfully!');
          this.router.navigate(['/categories']);
        },
        error: (err) => {
          // console.log(err);
          this.toastr.warning('Something went wrong!');
        },
      });

      // console.log(newCategory);
    } else {
      // console.log('Form is invalid!');
      this.toastr.error('Form is invalid!');
    }
  }
}
