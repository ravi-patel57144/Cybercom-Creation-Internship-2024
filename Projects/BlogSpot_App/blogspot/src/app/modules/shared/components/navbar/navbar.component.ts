import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { BlogsService } from 'src/app/core/services/blogs.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  searchKey: string = "";
  showBorder: string = '0';

  constructor(private router: Router, private blogService: BlogsService) { }

  ngOnInit(): void {
    const currentUrl = this.router.url;
    if (currentUrl.includes('/home?bookMarks=true')) {
      this.showBorder = '1';
    } else if (currentUrl === '/write') {
      this.showBorder = '2';
    }
  }

  homeNavigate() {
    this.showBorder = '0';
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/home']);
    });
  }

  openProfile() {
    this.showBorder = '0';
    const userID = localStorage.getItem('loggedInUserID');
    this.router.navigateByUrl('/home/profile?id=' + userID);
  }

  openBookMarks() {
    this.showBorder = '1';
    this.router.navigate(['/home'], { queryParams: { bookMarks: 'true' } });
  }

  openWrite() {
    this.showBorder = '2';
    this.router.navigateByUrl('/write');
  }

  logOut() {
    localStorage.removeItem('loggedInUserID');
    this.router.navigateByUrl('/');
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.blogService.blogSearchKeySubject.next(this.searchKey);
    }
  }

  getUserName() {
    const loggedInUserID = localStorage.getItem('loggedInUserID');
    return this.blogService.getUserName(loggedInUserID);
  }

  clearSearchKey() {
    this.searchKey = "";
    this.blogService.blogSearchKeySubject.next(this.searchKey);
  }
}
