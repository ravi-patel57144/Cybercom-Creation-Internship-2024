import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  constructor(private router: Router) { }

  logout() {
    localStorage.removeItem('id');
    this.router.navigate(['/']);
  }

  role_type() {
    const id = JSON.parse(localStorage.getItem('id') || '');
    const role = JSON.parse(localStorage.getItem('role') || '');

    if (id && role === 'admin') {
      return true;
    } else {
      return false;
    }
  }
}
