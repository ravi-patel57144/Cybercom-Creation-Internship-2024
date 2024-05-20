import { Component, Input, OnInit } from '@angular/core';
import { BlogsService } from 'src/app/core/services/blogs.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  @Input() title: any = "";
  @Input() category: any = "";
  @Input() description: any = "";
  @Input() blogID: any = "";
  @Input() editArticle: any = false;
  @Input() primaryImageURL: any = "";
  @Input() blogCreationTime: any = ""

  blogImageURL: any = "core/assets/image.png";

  readingTime: any = 0;
  userID: any = "";
  // @Input()
  blogOwnerName: any = "";
  constructor(private blogsService: BlogsService, private router: Router) {


  }
  ngOnInit(): void {
    // alert( this.blogID ) ;

    let blogObj: any = this.blogsService.getUserBlog(this.blogID);
    // alert( blogObj.userID ) ;
    // console.log( this.blogID , blogObj ) ;
    this.userID = blogObj.userID;
    this.blogOwnerName = this.blogsService.getUserName(blogObj.userID);
    if (this.editArticle) {
      let loggedInUserID = localStorage.getItem("loggedInUserID");
      if (Number(loggedInUserID) !== Number(this.userID)) {
        this.editArticle = false;
      }
    }


    this.getReadingTime();
    this.description = this.getParaContent(this.description);

  }



  readBlog() {
    // alert("read the blgo ") ;
    this.router.navigateByUrl("/home/readBlog?blogID=" + this.blogID);

  }

  changeArticle() {
    // alert(" change the artile") ;
    this.router.navigateByUrl('/write?id=' + this.blogID);
  }

  moveToUserProfile() {
    // alert("mved ") ;
    this.router.navigateByUrl("/home/profile?id=" + this.userID);
  }

  deleteArticle() {
    // alert("Artocle deleted ") ;
    // this.blogsService.deleteMyBlog( this.blogID) ;
    const ans = confirm("Are you sure you want to delete the Blog?");
    if (!ans) return;
    this.blogsService.deleteBlogIDSubject.next(this.blogID);
    // alert(" article deleed successfully " )

  }

  getDate() {
    const currentDate = new Date(this.blogCreationTime);

    // Format the date as "Month Day, Year"
    const options: any = { month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);

    return formattedDate;
  }

  getReadingTime() {
    let readTime: any = this.blogsService.calculateReadingTime(this.description);
    this.readingTime = readTime;
    // console.log( readTime) ;
  }

  // @Input() title: any = "";

  getParaContent(htmlString: any) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlString;

    // Remove images
    tempElement.querySelectorAll('img').forEach(img => img.remove());

    // Remove anchor tags
    tempElement.querySelectorAll('a').forEach(a => a.remove());

    // Extract text content
    let textContent = tempElement.textContent || tempElement.innerText;
    textContent = textContent.trim();
    return textContent;

    // console.log(textContent.trim())
  }
  handleImageError() {
    this.primaryImageURL = '/assets/image.png';
    console.log(this.primaryImageURL);
    // alert("Error ocured ")
  }
}
