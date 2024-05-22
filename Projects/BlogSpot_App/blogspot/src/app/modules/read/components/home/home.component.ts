import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookmarkService } from 'src/app/core/services/bookmark.service';
import { BlogsService } from 'src/app/core/services/blogs.service';
import { FollowerServiceService } from 'src/app/core/services/follower-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title: any = 'pagination';
  page: any = 1;
  count: any = 0;
  tableSize: any = 2;
  tableSizes: any = [1, 2, 3, 4];
  parentData: any = " this is the parent ";
  active: any = false; // Set to false for default "All Feed"

  allBlogs: any = [];
  originalAllBlogs: any = [];

  contentLoaded: any = false;

  constructor(
    private router: ActivatedRoute,
    private bookMarkService: BookmarkService,
    private blogService: BlogsService,
    private followService: FollowerServiceService
  ) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe((params: any) => {
      let bookMark: any = params.bookMarks;
      if (bookMark === 'true') {
        let loggedInUserID = localStorage.getItem("loggedInUserID");
        this.allBlogs = this.bookMarkService.getAllBookMarkedBlogs(loggedInUserID);
      } else {
        this.getAllBlogs();
      }
    });

    this.blogService.blogSearchKeySubject.subscribe(() => {
      this.applyFilters();
    });

    this.followService.topicSearchKeySubject.subscribe(() => {
      this.applyFilters();
    });
  }

  setActive() {
    this.active = true;
    this.getAllBlogs();
  }

  setNotActive() {
    this.active = false;
    this.getAllBlogs();
  }

  getAllBlogs() {
    this.contentLoaded = false;
    if (this.active) {
      let loggedInUserID = localStorage.getItem("loggedInUserID");
      this.allBlogs = this.followService.getBlogsOfFollowedUsers(loggedInUserID);
    } else {
      // Get all blogs
      this.allBlogs = localStorage.getItem("allBlogs");
      if (!this.allBlogs) {
        this.allBlogs = [];
      } else {
        this.allBlogs = JSON.parse(this.allBlogs);
      }
    }

    this.allBlogs.sort((a: any, b: any) => new Date(b.blogCreationTime).getTime() - new Date(a.blogCreationTime).getTime());

    this.originalAllBlogs = this.allBlogs;
    this.contentLoaded = true;
    this.applyFilters();
  }

  applyFilters() {
    this.allBlogs = this.originalAllBlogs;

    let titleFilter = this.blogService.blogSearchKeySubject.value;
    if (titleFilter) {
      this.allBlogs = this.allBlogs.filter((ele: any) => ele.title.toLowerCase().includes(titleFilter.toLowerCase()));
    }

    let topicFilter = this.followService.topicSearchKeySubject.value;
    if (topicFilter && topicFilter !== 'All') {
      this.allBlogs = this.allBlogs.filter((ele: any) => ele.category.includes(topicFilter));
    }
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.applyFilters();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.applyFilters();
  }
}
