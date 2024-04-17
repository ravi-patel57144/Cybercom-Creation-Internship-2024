import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('id');
    this.router.navigate(['/']);
  }
}
