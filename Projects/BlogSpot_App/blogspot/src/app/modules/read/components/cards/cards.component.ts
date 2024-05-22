import { Component, Input, OnInit } from '@angular/core';
import { BlogsService } from 'src/app/core/services/blogs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  @Input() title: string = "";
  @Input() category: string = "";
  @Input() description: string = "";
  @Input() blogID: string = "";
  @Input() editArticle: boolean = false;
  @Input() primaryImageURL: string = "";
  @Input() blogCreationTime: string = "";

  blogImageURL: string = "core/assets/image.png";
  readingTime: number = 0;
  userID: string = "";
  blogOwnerName: string = "";

  constructor(private blogsService: BlogsService, private router: Router) { }

  ngOnInit(): void {
    const blogObj = this.blogsService.getUserBlog(this.blogID);
    this.userID = blogObj.userID;
    this.blogOwnerName = this.blogsService.getUserName(blogObj.userID);

    const loggedInUserID = localStorage.getItem("loggedInUserID");
    if (loggedInUserID && Number(loggedInUserID) === Number(this.userID)) {
      this.editArticle = true;
    } else {
      this.editArticle = false;
    }

    this.getReadingTime();
    this.description = this.getParaContent(this.description);
  }

  readBlog(): void {
    this.router.navigateByUrl("/home/readBlog?blogID=" + this.blogID);
  }

  changeArticle(): void {
    this.router.navigateByUrl('/write?id=' + this.blogID);
  }

  moveToUserProfile(): void {
    this.router.navigateByUrl("/home/profile?id=" + this.userID);
  }

  deleteArticle(): void {
    const ans = confirm("Are you sure you want to delete the Blog?");
    if (!ans) return;
    this.blogsService.deleteBlogIDSubject.next(this.blogID);
  }

  getDate(): string {
    const currentDate = new Date(this.blogCreationTime);
    const options: any = { month: 'short', day: 'numeric', year: 'numeric' };
    return currentDate.toLocaleDateString('en-US', options);
  }

  getReadingTime(): void {
    this.readingTime = this.blogsService.calculateReadingTime(this.description);
  }

  getParaContent(htmlString: string): string {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlString;

    tempElement.querySelectorAll('img').forEach(img => img.remove());
    tempElement.querySelectorAll('a').forEach(a => a.remove());

    let textContent = tempElement.textContent || tempElement.innerText;
    return textContent.trim();
  }

  handleImageError(): void {
    this.primaryImageURL = '/assets/image.png';
    console.log(this.primaryImageURL);
  }
}
