import { Component, OnInit , Input } from '@angular/core';
import { ViewChild } from '@angular/core';
import { BlogsService } from 'src/app/core/services/blogs.service';
import { ActivatedRoute } from '@angular/router';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { CommentsService } from 'src/app/core/services/comments.service';
// import { OnInit } from '@angular/core';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit{
   allComments : any = [] 
   blogID : any = "" ; 
   textAreaValue : any ='' ; 
   commentAlreadyLiked : any = false ; 
  
    //showOptions
  //  @Input() showComments : any = "" ; 
  @ViewChild('inputElement')  inputElement: any = "";

  constructor(private blogService : BlogsService , private route: ActivatedRoute , private router : Router , 
    private commentService : CommentsService
   ){
     
  }

  hideComments(){
    // alert("hi")
    // this.showComments = false; 
    // alert(this.showComments); 
    this.blogService.hideComment() ; 
    // alert(" this si te black ")
  }
  setCommentArray(){
    let commentArray : any = localStorage.getItem("commentArray") ; 
    if( !commentArray){
      localStorage.setItem("commentArray" , JSON.stringify([])) ; 
    }

    commentArray= localStorage.getItem("commentArray") ;  
    commentArray = JSON.parse( commentArray ) ; 
    // console.log( " commentarray "  , commentArray  , this.blogID ) ; 
    commentArray  = commentArray.filter( ( ele : any )=> Number(ele.blogID) === Number(this.blogID)  ) ;
    this.allComments = commentArray  ; 
    // console.log( this.inputElement ) ; 
    // alert(" in the commenrs ")
    this.textAreaValue = ""
    // this.inputElement.nativeElement.setAttribute( 'value' , '') ; 
  }
  openProfile( userID : any ){

    // alert(userID ) ; 
    this.router.navigateByUrl('/home/profile?id=' +userID )   ; 
  }
  ngOnInit() {
    
    this.route.queryParams.subscribe(  (params:any )  => {
      //  console.log(params  ) ;
       this.blogID= Number(params.blogID)  ;
       this.setCommentArray()  ;
      //  alert( this.blogID)
      //  console.log( this.blogID , " this.blogID ")      
    });
   
  }
  addComment(){
    // console.log( this.)
    // console.log( this.inputElement.nativeElement.value  )  ;
    let msg = this.inputElement.nativeElement.value ; 
    let userID : any  = localStorage.getItem("loggedInUserID") ; 
    userID = Number( userID ) ; 
    // console.log( msg  , this.blogID , userID ) ;
    // console.log( this.textAreaValue)
    // console.log(this.inputElement.nativeElement.attributes.placeholder  ,this.textAreaValue    )
    // this.inputElement.nativeElement.setAttribute( 'value' , '') ; 
    this.blogService.addComment( msg, userID   , this.blogID  ) ;

    this.blogService.newCommentAdded.next( true ) ; 


    this.setCommentArray() ; 

     
    

    // console.log( this.inputElement.nativeElement.innerText  ) ; 
    // let commentArray : any = localStorage.getItem("commentArray") ; 
    // if( !commentArray){
    //   localStorage.setItem("commentArray" , JSON.stringify([])) ; 
    // }
    // commentArray= localStorage.getItem("commentArray") ;  
    // commentArray = JSON.parse
  }

  getNameFromID( id : any ){
    // alert( id )  ;
    let allUsers: any  = localStorage.getItem("allUsers") ; 
    allUsers = JSON.parse( allUsers) ; 
    let ind : any= allUsers.findIndex( ( ele : any) => Number(ele.id)  === Number(id) ) ; 
    // console.log("ind "  , ind  )  ; 
    if( ind == -1 ) return "" ; 

    return allUsers[ind].userName ; 
  }
  getCommentLikeCount(commentID:any){
    let loggedInUserID = localStorage.getItem("loggedInUserID")
    let ans : any = this.commentService.getCommentLikeCount(commentID) ; 
    return ans ; 

  }
  isCommentLiked(commentID:any){
    let loggedInUserID = localStorage.getItem("loggedInUserID")
    let ans: any = this.commentService.isCommentLiked( commentID , loggedInUserID ) ;
    return ans   ; 
  }
  likeTheComment( commentID : any ){
    // alert(commentID) ; 
    let loggedInUserID = localStorage.getItem("loggedInUserID")
    this.commentService.likeTheComment( commentID , loggedInUserID ) ; 

    // this.isCommentLiked( commentID ) ; 
  
  }
  dislikeTheComment( commentID :any ){
    let loggedInUserID = localStorage.getItem("loggedInUserID") ; 
    this.commentService.unLikeTheComment(commentID , loggedInUserID ) ; 
  }
  canDeleteComment( userID : any ){
    let loggedInUserID: any = localStorage.getItem("loggedInUserID")
    let ans : any  = Number(userID) === Number(loggedInUserID) ; 
    return ans ; 
  }
  deleteTheComment(commentID:any, userID:any){
    // alert("delete the comment") ; 
    const ans : any = confirm("Are you sure you want to delete the comment?")  ; 
    // console.log( commentID , userID  ) ; 
    if( !ans ) return    ; 
    this.commentService.deleteTheComment( commentID , userID ) ; 
    this.setCommentArray()  ;

  }
  
}
