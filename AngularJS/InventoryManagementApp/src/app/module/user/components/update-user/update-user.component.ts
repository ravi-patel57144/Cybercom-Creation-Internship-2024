import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
})
export class UpdateUserComponent {
  userForm: FormGroup;
  userId: number | undefined;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      avatar: [''],
    });
  }

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.fetchUserById(this.userId);
  }

  hasUnsavedChanges(): boolean {
    return this.userForm.dirty;
  }

  fetchUserById(id: number) {
    this.authService.fetchUserById(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.userForm.patchValue({
          name: res.name,
          email: res.email,
          password: res.password,
          avatar: res.avatar,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      let updatedUser = {
        name: this.userForm.value.name,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        avatar: this.userForm.value.avatar,
      };

      console.log(updatedUser);

      this.authService.updateUser(this.userId, updatedUser).subscribe({
        next: (res: any) => {
          console.log('record updated');
          this.toastr.success('User updated successfully!');
          this.router.navigate(['/user']);
        },
        error: (err) => {
          console.log(err);
          this.toastr.warning('Something went wrong!');
        },
      });
    }
  }
}
