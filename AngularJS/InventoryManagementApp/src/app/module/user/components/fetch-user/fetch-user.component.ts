import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fetch-user',
  templateUrl: './fetch-user.component.html',
})
export class FetchUserComponent implements OnInit {
  users: any;
  id: any;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('id')!);
    this.fetchUsers();
  }

  fetchUsers() {
    this.isLoading = true;
    this.authService.fetchUser().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.users = res;
        console.log(res);
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      },
    });
  }

  updateNavigation(id: number) {
    this.router.navigate([`/user/update/${id}`]);
  }

  deleteUser(id: number) {
    let status = confirm('Are you sure you want to delete?');
    if (status) {
      this.authService.deleteUser(id).subscribe({
        next: (res) => {
          console.log(res);
          this.toastr.error('User deleted successfully!');
          this.fetchUsers();
        },
        error: (err) => {
          console.log(err);
          this.toastr.warning('Something went wrong!');
        },
      });
    }
  }
}
