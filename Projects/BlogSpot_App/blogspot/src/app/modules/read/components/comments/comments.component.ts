import { Component, OnInit, Input } from '@angular/core';
import { ViewChild } from '@angular/core';
import { BlogsService } from 'src/app/core/services/blogs.service';
import { ActivatedRoute } from '@angular/router';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { CommentsService } from 'src/app/core/services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  allComments: any = []
  blogID: any = "";
  textAreaValue: any = '';
  commentAlreadyLiked: any = false;


  @ViewChild('inputElement') inputElement: any = "";

  constructor(private blogService: BlogsService, private route: ActivatedRoute, private router: Router,
    private commentService: CommentsService
  ) {

  }

  hideComments() {
    this.blogService.hideComment();
  }
  setCommentArray() {
    let commentArray: any = localStorage.getItem("commentArray");
    if (!commentArray) {
      localStorage.setItem("commentArray", JSON.stringify([]));
    }

    commentArray = localStorage.getItem("commentArray");
    commentArray = JSON.parse(commentArray);
    commentArray = commentArray.filter((ele: any) => Number(ele.blogID) === Number(this.blogID));
    this.allComments = commentArray;
    this.textAreaValue = ""
  }
  openProfile(userID: any) {
    this.router.navigateByUrl('/home/profile?id=' + userID);
  }
  ngOnInit() {

    this.route.queryParams.subscribe((params: any) => {
      this.blogID = Number(params.blogID);
      this.setCommentArray();
    });

  }
  addComment() {
    if (!this.textAreaValue.trim()) {
      alert("Please enter a valid comment.");
      return;
    }

    let msg = this.textAreaValue.trim();
    let userID: any = localStorage.getItem("loggedInUserID");
    userID = Number(userID);

    this.blogService.addComment(msg, userID, this.blogID);

    this.blogService.newCommentAdded.next(true);

    this.textAreaValue = "";

    this.setCommentArray();
  }


  getNameFromID(id: any) {
    let allUsers: any = localStorage.getItem("allUsers");
    allUsers = JSON.parse(allUsers);
    let ind: any = allUsers.findIndex((ele: any) => Number(ele.id) === Number(id));
    if (ind == -1) return "";

    return allUsers[ind].userName;
  }
  getCommentLikeCount(commentID: any) {
    let loggedInUserID = localStorage.getItem("loggedInUserID")
    let ans: any = this.commentService.getCommentLikeCount(commentID);
    return ans;

  }
  isCommentLiked(commentID: any) {
    let loggedInUserID = localStorage.getItem("loggedInUserID")
    let ans: any = this.commentService.isCommentLiked(commentID, loggedInUserID);
    return ans;
  }
  likeTheComment(commentID: any) {
    let loggedInUserID = localStorage.getItem("loggedInUserID")
    this.commentService.likeTheComment(commentID, loggedInUserID);
  }
  dislikeTheComment(commentID: any) {
    let loggedInUserID = localStorage.getItem("loggedInUserID");
    this.commentService.unLikeTheComment(commentID, loggedInUserID);
  }
  canDeleteComment(userID: any) {
    let loggedInUserID: any = localStorage.getItem("loggedInUserID")
    let ans: any = Number(userID) === Number(loggedInUserID);
    return ans;
  }
  deleteTheComment(commentID: any, userID: any) {
    const ans: any = confirm("Are you sure you want to delete the comment?");
    if (!ans) return;
    this.commentService.deleteTheComment(commentID, userID);
    this.setCommentArray();

  }

}
