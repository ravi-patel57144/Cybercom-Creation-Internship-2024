import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor() { }

  getCommentLikeCount(commentID:any){
    let commentLikeArray : any = localStorage.getItem("commentLikeArray") ;
    if( !commentLikeArray){
      localStorage.setItem("commentLikeArray" , JSON.stringify([]) ); 
    }
    
    commentLikeArray  = localStorage.getItem("commentLikeArray") ;
    commentLikeArray = JSON.parse(commentLikeArray) ; 
    let total : any = commentLikeArray.reduce( ( acc : any , ele : any  )=>{
          if( Number(ele.commentID) === Number(commentID) ) return acc  + 1 ; 
          return acc ; 
    } , 0 ) ; 
    return total ; 
  }

  isCommentLiked( commentID : any , userID : any ){
    let commentLikeArray : any = localStorage.getItem("commentLikeArray") ;
    if( !commentLikeArray){
      localStorage.setItem("commentLikeArray" , JSON.stringify([]) ); 
    }
    
    commentLikeArray  = localStorage.getItem("commentLikeArray") ;
    commentLikeArray = JSON.parse(commentLikeArray) ; 
    let ind : any = commentLikeArray.findIndex(( ele : any ) => Number(ele.commentID) === Number(commentID) && Number(ele.userID) === Number(userID) ) ; 
    if( ind === -1 ) return false ; 
    return true ; 
  } 
  likeTheComment(  commentID : any , userID : any ){
    let commentLikeArray : any = localStorage.getItem("commentLikeArray") ;
    if( !commentLikeArray){
      localStorage.setItem("commentLikeArray" , JSON.stringify([]) ); 
    }
    
    commentLikeArray  = localStorage.getItem("commentLikeArray") ;
    commentLikeArray = JSON.parse(commentLikeArray) ; 
    let ind : any = commentLikeArray.findIndex(( ele : any ) => Number(ele.commentID) === Number(commentID) && Number(ele.userID) === Number(userID) ) ; 
    if( ind === -1 ) {
      let commentObj = { "commentID" : commentID , "userID" : userID} ; 
      commentLikeArray.push( commentObj) ; 
      localStorage.setItem("commentLikeArray" , JSON.stringify(commentLikeArray)) ; 
    }
  }
  unLikeTheComment(  commentID : any , userID : any ){
    let commentLikeArray : any = localStorage.getItem("commentLikeArray") ;
    if( !commentLikeArray){
      localStorage.setItem("commentLikeArray" , JSON.stringify([]) ); 
    }
    
    commentLikeArray  = localStorage.getItem("commentLikeArray") ;
    commentLikeArray = JSON.parse(commentLikeArray) ; 
    commentLikeArray = commentLikeArray.filter( ( ele : any )=> !( Number(ele.commentID) === Number(commentID) && Number(ele.userID) === Number(userID) )) ; 
    localStorage.setItem("commentLikeArray" , JSON.stringify(commentLikeArray)) ; 

  }

  canDeleteComment( commentID : any , userID :any ){
    let commentLikeArray : any = localStorage.getItem("commentLikeArray") ;
    if( !commentLikeArray){
      localStorage.setItem("commentLikeArray" , JSON.stringify([]) ); 
    }
    
    commentLikeArray  = localStorage.getItem("commentLikeArray") ;
    commentLikeArray = JSON.parse(commentLikeArray) ; 
    let ind : any = commentLikeArray.findIndex(( ele : any ) => Number(ele.commentID) === Number(commentID) && Number(ele.userID) === Number(userID) ) ; 
    if( ind === -1 ) return false ; 
    return true ; 
  }
  deleteTheComment(commentID:any, userID:any){
   
  //  1) REMOVE FORM THE LKE ARRAY 
    let commentLikeArray : any = localStorage.getItem("commentLikeArray") ;
    if( !commentLikeArray){
      localStorage.setItem("commentLikeArray" , JSON.stringify([]) ); 
    }
    
    commentLikeArray  = localStorage.getItem("commentLikeArray") ;
    commentLikeArray = JSON.parse(commentLikeArray) ; 
    commentLikeArray = commentLikeArray.filter(( ele : any ) => Number(ele.commentID) === Number(commentID) && Number(ele.userID) === Number(userID) ) ; 
 
    // 2) REMOVE FROM THE COMMENT ARRAY 

    let commentArray : any = localStorage.getItem("commentArray") ;
    if( !commentArray){
      localStorage.setItem("commentArray" , JSON.stringify([])) ; 
    }
    commentArray  = localStorage.getItem("commentArray") ;
    commentArray = JSON.parse(commentArray ) ; 

    commentArray = commentArray.filter((ele : any)=> !(Number(ele.commentID) === Number(commentID))  ) ; 
    localStorage.setItem("commentArray" , JSON.stringify(commentArray)) ; 


  }
}
