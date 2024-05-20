import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogsService } from 'src/app/core/services/blogs.service';
import { Router } from '@angular/router';
import { BookmarkService } from 'src/app/core/services/bookmark.service';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-read-blog',
  templateUrl: './read-blog.component.html',
  styleUrls: ['./read-blog.component.css']
})
export class ReadBlogComponent implements OnInit, OnDestroy {

  blogID: any = "";
  loggedINUserInfo: any = {}
  blogObj: any = {};

  followingThePerson: any = false;
  blogOwnerUserID: any = '';

  showFollowOption: any = true;
  public showComments: any = false;
  editor: any = '';
  html = '';

  constructor(private route: ActivatedRoute, private blogService: BlogsService, private router: Router,
    private bookMarks: BookmarkService
  ) {

    this.blogService.myBehaviorSubject.subscribe((val: any) => {
      this.showComments = val;
    });
    this.blogService.newCommentAdded.subscribe((val: any) => {
      if (val) {
        this.getComentCount();

      }
    })
  }

  blogLiked: any = false;


  ngOnInit() {

    this.editor = new Editor();
    this.route.queryParams.subscribe((params: any) => {
      console.log(params);
      this.blogID = Number(params.blogID);


      let allBlogs: any = localStorage.getItem("allBlogs");
      allBlogs = JSON.parse(allBlogs);

      let ind: any = allBlogs.findIndex((ele: any) => Number(ele.id) === Number(this.blogID));
      if (ind === -1) {
        this.blogObj = {};
      } else {

        this.blogObj = allBlogs[ind];
        console.log(this.blogObj);
        console.log(this.blogObj.primaryImageURL);
        this.html = this.blogObj.description;
        this.blogObj.description = this.blogObj.description.replace(/\n/g, '<br/>')
        this.blogOwnerUserID = allBlogs[ind].userID;


        let allUsers: any = localStorage.getItem("allUsers");
        allUsers = JSON.parse(allUsers);

        let index = allUsers.findIndex((ele: any) => Number(ele.id) === Number(this.blogOwnerUserID));
        if (index === -1) {
          this.loggedINUserInfo = {};
        } else {
          this.loggedINUserInfo = allUsers[index];

        }
        let loggedInUserID: any = localStorage.getItem("loggedInUserID");

        this.showFollowOption = Number(loggedInUserID) !== Number(this.blogOwnerUserID);






      }



    });

    this.isBlogLiked();
    this.isFollowingThePerson();
  }
  ngOnDestroy(): void {
    this.editor.destroy();
  }
  getLikeCount() {
    let ans = this.blogService.getTotalLikeCount(this.blogID);
    return ans;

  }
  getComentCount() {
    let ans = this.blogService.getComentCount(this.blogID);
    return ans;
  }
  openProfile() {


    this.router.navigateByUrl('/home/profile?id=' + this.blogOwnerUserID);
  }

  handleComment() {
    this.blogService.showComment();

  }
  likeTheBlog() {
    let loggedInUserID: any = localStorage.getItem("loggedInUserID");
    loggedInUserID = Number(loggedInUserID);
    console.log(loggedInUserID, this.blogID);
    this.blogService.likeTheBog(this.blogID, loggedInUserID);
    this.isBlogLiked();


  }
  dislikeTheBlog() {
    let loggedInUserID: any = localStorage.getItem("loggedInUserID");
    loggedInUserID = Number(loggedInUserID);
    this.blogService.dislikeTheBlog(this.blogID, loggedInUserID,);
    this.isBlogLiked();
  }
  isBlogLiked() {
    let loggedInUserID: any = localStorage.getItem("loggedInUserID");
    loggedInUserID = Number(loggedInUserID);
    console.log(loggedInUserID, this.blogID, " goung to like it ")
    let ans = this.blogService.isBlogLiked(this.blogID, loggedInUserID);
    this.blogLiked = ans;
    this.getLikeCount();
  }
  followThePerson() {
    let loggedInUserID: any = localStorage.getItem("loggedInUserID");
    loggedInUserID = Number(loggedInUserID);

    let followedBY = loggedInUserID;

    let allBlogs: any = localStorage.getItem("allBlogs");
    allBlogs = JSON.parse(allBlogs);
    let ind: any = allBlogs.findIndex((ele: any) => Number(ele.id) === this.blogID);
    let followedTO = ind === -1 ? -1 : allBlogs[ind].userID;
    this.blogService.followThePerson(followedBY, followedTO);
    this.isFollowingThePerson();


  }

  isFollowingThePerson() {
    let loggedInUserID: any = localStorage.getItem("loggedInUserID");
    loggedInUserID = Number(loggedInUserID);

    let followedBY = loggedInUserID;

    let allBlogs: any = localStorage.getItem("allBlogs");
    allBlogs = JSON.parse(allBlogs);
    let ind: any = allBlogs.findIndex((ele: any) => Number(ele.id) === this.blogID);
    let followedTO = ind === -1 ? -1 : allBlogs[ind].userID;
    console.log(followedBY, followedTO);

    let ans: any = this.blogService.isFollowingThePerson(followedBY, followedTO);
    this.followingThePerson = ans;

  }
  unfollowThePerson() {
    let loggedInUserID: any = localStorage.getItem("loggedInUserID");
    loggedInUserID = Number(loggedInUserID);

    let followedBY = loggedInUserID;

    let allBlogs: any = localStorage.getItem("allBlogs");
    allBlogs = JSON.parse(allBlogs);
    let ind: any = allBlogs.findIndex((ele: any) => Number(ele.id) === this.blogID);
    let followedTO = ind === -1 ? -1 : allBlogs[ind].userID;
    this.blogService.unfollowThePerson(followedBY, followedTO);
    this.isFollowingThePerson();
  }
  isArticeleSaved() {
    let loggedInUserID = localStorage.getItem("loggedInUserID");
    let ans: any = this.bookMarks.isBlogSaved(this.blogID, loggedInUserID);
    return ans;
  }
  saveTheBlog() {
    let loggedInUserID = localStorage.getItem("loggedInUserID");
    this.bookMarks.saveTheBlog(this.blogID, loggedInUserID);

  }
  unSaveTheBlog() {
    let loggedInUserID = localStorage.getItem("loggedInUserID");
    this.bookMarks.unsaveTheBlog(this.blogID, loggedInUserID);
  }
  handleImageError() {
    this.blogObj.primaryImageURL = '/assets/image.png';
  }
}
