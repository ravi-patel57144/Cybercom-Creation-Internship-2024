import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor() {
    this.initializelikes();
    this.initializecomments();
  }


  private initializelikes() {
    let likes = localStorage.getItem("likeArray");
    if (!likes) {
      const defaultlikeArray = [
        { blogID: 1, userID: 1 },
        { blogID: 2, userID: 1 },
        { blogID: 3, userID: 1 },
        { blogID: 4, userID: 1 },
        { blogID: 1, userID: 2 },
        { blogID: 2, userID: 2 },
        { blogID: 3, userID: 2 },
        { blogID: 5, userID: 2 },
        { blogID: 4, userID: 2 },
        { blogID: 6, userID: 3 },
        { blogID: 7, userID: 3 },
        { blogID: 8, userID: 3 },
        { blogID: 9, userID: 3 },
        { blogID: 10, userID: 3 },
        { blogID: 11, userID: 4 },
        { blogID: 12, userID: 4 },
        { blogID: 13, userID: 4 },
        { blogID: 14, userID: 4 },
        { blogID: 15, userID: 4 },
        { blogID: 16, userID: 5 },
        { blogID: 17, userID: 5 },
        { blogID: 18, userID: 5 },
        { blogID: 19, userID: 5 },
        { blogID: 20, userID: 5 },
        { blogID: 21, userID: 6 },
        { blogID: 22, userID: 6 },
        { blogID: 23, userID: 7 },
        { blogID: 24, userID: 7 },
        { blogID: 25, userID: 8 },
        { blogID: 26, userID: 8 },
        { blogID: 27, userID: 9 },
        { blogID: 28, userID: 9 },
        { blogID: 29, userID: 10 },
        { blogID: 30, userID: 10 }
      ];
      localStorage.setItem("likeArray", JSON.stringify(defaultlikeArray));
    }
  }



  private initializecomments() {
    let comments = localStorage.getItem("commentArray");
    if (!comments) {
      const defaultcomments = [
        { commentID: 1, message: 'Nice', blogID: 2, userID: 1 },
        { commentID: 2, message: 'Good!!', blogID: 1, userID: 2 },
        { commentID: 3, message: 'Nice!!', blogID: 2, userID: 2 },
        { commentID: 4, message: 'Good Information!', blogID: 3, userID: 2 },
        { commentID: 5, message: 'nice blog', blogID: 4, userID: 2 },
        { commentID: 6, message: 'Informative!!', blogID: 2, userID: 3 },
        { commentID: 7, message: 'Informative blog!', blogID: 1, userID: 1 },
        { commentID: 8, message: 'Great content!', blogID: 21, userID: 6 },
        { commentID: 9, message: 'Very informative', blogID: 22, userID: 6 },
        { commentID: 10, message: 'Interesting read', blogID: 23, userID: 7 },
        { commentID: 11, message: 'Well explained', blogID: 24, userID: 7 },
        { commentID: 12, message: 'Looking forward to more!', blogID: 25, userID: 8 },
        { commentID: 13, message: 'Helpful tips', blogID: 26, userID: 8 },
        { commentID: 14, message: 'Insightful!', blogID: 27, userID: 9 },
        { commentID: 15, message: 'Thanks for sharing', blogID: 28, userID: 9 },
        { commentID: 16, message: 'Enjoyed reading this', blogID: 29, userID: 10 },
        { commentID: 17, message: 'Keep up the good work', blogID: 30, userID: 10 }
      ];
      localStorage.setItem("commentArray", JSON.stringify(defaultcomments));
    }
  }

  getCommentLikeCount(commentID: any) {
    let commentLikeArray: any = localStorage.getItem("commentLikeArray");
    if (!commentLikeArray) {
      localStorage.setItem("commentLikeArray", JSON.stringify([]));
    }

    commentLikeArray = localStorage.getItem("commentLikeArray");
    commentLikeArray = JSON.parse(commentLikeArray);
    let total: any = commentLikeArray.reduce((acc: any, ele: any) => {
      if (Number(ele.commentID) === Number(commentID)) return acc + 1;
      return acc;
    }, 0);
    return total;
  }

  isCommentLiked(commentID: any, userID: any) {
    let commentLikeArray: any = localStorage.getItem("commentLikeArray");
    if (!commentLikeArray) {
      localStorage.setItem("commentLikeArray", JSON.stringify([]));
    }

    commentLikeArray = localStorage.getItem("commentLikeArray");
    commentLikeArray = JSON.parse(commentLikeArray);
    let ind: any = commentLikeArray.findIndex((ele: any) => Number(ele.commentID) === Number(commentID) && Number(ele.userID) === Number(userID));
    if (ind === -1) return false;
    return true;
  }
  likeTheComment(commentID: any, userID: any) {
    let commentLikeArray: any = localStorage.getItem("commentLikeArray");
    if (!commentLikeArray) {
      localStorage.setItem("commentLikeArray", JSON.stringify([]));
    }

    commentLikeArray = localStorage.getItem("commentLikeArray");
    commentLikeArray = JSON.parse(commentLikeArray);
    let ind: any = commentLikeArray.findIndex((ele: any) => Number(ele.commentID) === Number(commentID) && Number(ele.userID) === Number(userID));
    if (ind === -1) {
      let commentObj = { "commentID": commentID, "userID": userID };
      commentLikeArray.push(commentObj);
      localStorage.setItem("commentLikeArray", JSON.stringify(commentLikeArray));
    }
  }
  unLikeTheComment(commentID: any, userID: any) {
    let commentLikeArray: any = localStorage.getItem("commentLikeArray");
    if (!commentLikeArray) {
      localStorage.setItem("commentLikeArray", JSON.stringify([]));
    }

    commentLikeArray = localStorage.getItem("commentLikeArray");
    commentLikeArray = JSON.parse(commentLikeArray);
    commentLikeArray = commentLikeArray.filter((ele: any) => !(Number(ele.commentID) === Number(commentID) && Number(ele.userID) === Number(userID)));
    localStorage.setItem("commentLikeArray", JSON.stringify(commentLikeArray));

  }

  canDeleteComment(commentID: any, userID: any) {
    let commentLikeArray: any = localStorage.getItem("commentLikeArray");
    if (!commentLikeArray) {
      localStorage.setItem("commentLikeArray", JSON.stringify([]));
    }

    commentLikeArray = localStorage.getItem("commentLikeArray");
    commentLikeArray = JSON.parse(commentLikeArray);
    let ind: any = commentLikeArray.findIndex((ele: any) => Number(ele.commentID) === Number(commentID) && Number(ele.userID) === Number(userID));
    if (ind === -1) return false;
    return true;
  }
  deleteTheComment(commentID: any, userID: any) {

    //  1) REMOVE FORM THE LKE ARRAY
    let commentLikeArray: any = localStorage.getItem("commentLikeArray");
    if (!commentLikeArray) {
      localStorage.setItem("commentLikeArray", JSON.stringify([]));
    }

    commentLikeArray = localStorage.getItem("commentLikeArray");
    commentLikeArray = JSON.parse(commentLikeArray);
    commentLikeArray = commentLikeArray.filter((ele: any) => Number(ele.commentID) === Number(commentID) && Number(ele.userID) === Number(userID));


    let commentArray: any = localStorage.getItem("commentArray");
    if (!commentArray) {
      localStorage.setItem("commentArray", JSON.stringify([]));
    }
    commentArray = localStorage.getItem("commentArray");
    commentArray = JSON.parse(commentArray);

    commentArray = commentArray.filter((ele: any) => !(Number(ele.commentID) === Number(commentID)));
    localStorage.setItem("commentArray", JSON.stringify(commentArray));


  }
}
