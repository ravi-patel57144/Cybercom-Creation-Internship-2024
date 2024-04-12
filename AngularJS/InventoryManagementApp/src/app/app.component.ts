import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  id: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('id')!);
  }

  logout() {
    localStorage.removeItem('id');
    this.id = undefined;
    this.router.navigate(['/user/login']);
  }

}
