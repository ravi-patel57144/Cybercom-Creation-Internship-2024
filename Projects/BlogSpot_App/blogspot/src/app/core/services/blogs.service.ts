import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
   public myBehaviorSubject:any ;
   public newCommentAdded : any  ;
   public deleteBlogIDSubject : any ; 
   public blogSearchKeySubject :any ;

  constructor() {
   this.myBehaviorSubject = new BehaviorSubject<boolean>(false);
   this.newCommentAdded = new BehaviorSubject<boolean>( false); 
   this.deleteBlogIDSubject = new BehaviorSubject<any>( -1 ) ; 
   this.blogSearchKeySubject = new BehaviorSubject<any>( "" ) ; 
   }

  createNewBlog( title : any  , category : any , description : any , primaryImageURL : any ){
      let allBlogs : any  = localStorage.getItem("allBlogs") ; 
      if( !allBlogs){
        localStorage.setItem("allBlogs" , JSON.stringify([])) ; 

      } 
      allBlogs = localStorage.getItem("allBlogs") ; 
      
      allBlogs = JSON.parse( allBlogs ) ; 

      let id = Date.now() ; 
      let userID : any  = localStorage.getItem("loggedInUserID") ; 
      userID = JSON.parse( userID ) ; 
      let obj = { "title":title , "category" : category ,  "description" : description, id :id , "userID" : userID  , "primaryImageURL" : primaryImageURL , 
                 "blogCreationTime" : id
      } ; 
      allBlogs.push( obj ) ; 
      localStorage.setItem("allBlogs" , JSON.stringify(allBlogs)) ; 
      
      return true ; 

  }

  editBlog( blogid:any  ,  title : any  , category : any , description : any , primaryImageURL: any){
    let allBlogs : any  = localStorage.getItem("allBlogs") ; 
    // console.log( "the blogid to edit is this " ,  blogid  ) ; 
    if( !allBlogs){
      localStorage.setItem("allBlogs" , JSON.stringify([])) ; 

    } 
    allBlogs = localStorage.getItem("allBlogs") ; 
    
    allBlogs = JSON.parse( allBlogs ) ; 
    let obj = { "title":title , "category" : category ,  "description" : description , "primaryImageURL" : primaryImageURL} ; 
    let ind :any = allBlogs.findIndex( ( ele : any) => Number(ele.  id) === Number(blogid) ) ; 
    if( ind === -1 ){
      return   ; 
    }
    allBlogs[ind] = {...allBlogs[ind] , ...obj } ; 
    localStorage.setItem('allBlogs' ,JSON.stringify(allBlogs )) ; 
  }

  getUserName( userID:any  ){
    // let userID : any = localStorage.getItem("loggedInUserID") ; 
    if( !userID ) return "" ; 
    userID = Number( userID ) ; 
    let allUsers :any = localStorage.getItem("allUsers") ; 
    allUsers = JSON.parse( allUsers ) ;
    if( !allUsers ) return "" ;
    let ind = allUsers.findIndex( ( ele : any) => Number(ele.id) === userID )  ; 
    if( ind === -1 ) return "" ; 
    return allUsers[ind].userName ; 
  }

  getUserProfile(userID : any ){
    // let userID : any = localStorage.getItem("loggedInUserID") ; 
    if( !userID ) return "" ; 
    userID = Number( userID ) ; 
    let allUsers :any = localStorage.getItem("allUsers") ; 
    allUsers = JSON.parse( allUsers ) ;
    if( !allUsers ) return "" ;
    let ind = allUsers.findIndex( ( ele : any) => Number(ele.id) === userID )  ; 
    if( ind === -1 ) return "" ; 
    return allUsers[ind] ; 
  }

  getTotalLikeCount( id : any ){
    // alert( blogID )  ; 
    // console.log( " the log Id ;iked is "  , id ) ; 
    let likeArray :  any = localStorage.getItem('likeArray') ; 
    likeArray = JSON.parse( likeArray ) ; 
    // console.log(  " the iearray is this " , likeArray ) ; 
    if( !likeArray ) return 0 ; 

    let ans = likeArray.reduce(( acc :any , ele:any )=>{
      // console.log()
      if( Number(ele.blogID) === Number(id) ) return acc + 1 ; 
      return acc ; 
    } , 0 ) 
    
    return ans ; 

  }
  getComentCount( blogID  : any ){
    let commentArray : any = localStorage.getItem("commentArray") ; 
    commentArray = JSON.parse( commentArray ) ; 
    if( !commentArray ) return  0 ;
    let ans= commentArray.reduce(( acc : any , ele : any )=>{
        if( Number(ele.blogID) === Number(blogID ) ) return acc + 1; 
        return acc ; 
    } , 0 ) 
    return ans ; 
  }
  
  saveUserProfile( userObj : any ,userID:any ){
    // let userID : any = localStorage.getItem("loggedInUserID") ; 
    // if( !userID ) return "" ; 
    userID = Number( userID ) ; 
    let allUsers :any = localStorage.getItem("allUsers") ; 
    allUsers = JSON.parse( allUsers ) ;
    if( !allUsers ) return "" ;
    let ind = allUsers.findIndex( ( ele : any) => Number(ele.id) === userID )  ;
    if( ind === -1 ) return "" ;  
    allUsers[ind] =  { ...allUsers[ind ] , ...userObj} ; 
    localStorage.setItem("allUsers" , JSON.stringify( allUsers)) ;
    return "" ; 

  }
  isBlogLiked(blogID : any , userID : any  ){
    // alert( userID ) ; 
    let likeArray : any  = localStorage.getItem("likeArray") ; 
    if( !likeArray ){
      localStorage.setItem("likeArray" , JSON.stringify([])) ; 
    }
    likeArray = localStorage.getItem("likeArray") ;  
    likeArray = JSON.parse( likeArray ) ; 
    let ind = likeArray.findIndex( ( ele : any ) => ele.blogID === blogID && ele.userID === userID   ) ; 
    if( ind === -1 ) return false ; 
    return true ; 
  }

  likeTheBog( blogID : any , userID : any  ){
    let likeArray : any  = localStorage.getItem("likeArray") ; 
    if( !likeArray ){
      localStorage.setItem("likeArray" , JSON.stringify([])) ; 
    }
    likeArray = localStorage.getItem("likeArray") ;  
    likeArray = JSON.parse( likeArray ) ;
     
    let ind = likeArray.findIndex( ( ele : any ) => ele.blogID === blogID && ele.userID === userID   ) ; 
    if( ind === -1 ){
      const obj = { "blogID" : blogID  , "userID" : userID } ; 
      likeArray.push( obj ) ; 
      localStorage.setItem("likeArray" , JSON.stringify(likeArray)) ; 
    }
  }

  dislikeTheBlog(blogID : any , userID : any){
    let likeArray : any  = localStorage.getItem("likeArray") ; 
    if( !likeArray ){
      localStorage.setItem("likeArray" , JSON.stringify([])) ; 
    }
    likeArray = localStorage.getItem("likeArray") ;  
    likeArray = JSON.parse( likeArray ) ;
    likeArray = likeArray.filter( ( ele : any ) => !(Number(ele.blogID)=== blogID && Number(ele.userID) === ele.userID) ) ; 
    localStorage.setItem("likeArray" , JSON.stringify(likeArray)) ; 

  }
  followThePerson(followedBY : any , followedTO : any ){
    console.log( followedBY , followedTO)

    let followArray : any  = localStorage.getItem("followArray") ; 
    if( !followArray ){
      localStorage.setItem("followArray" , JSON.stringify([])) ; 
    }
    followArray = localStorage.getItem("followArray") ;  
    followArray = JSON.parse( followArray ) ;
    let ind = followArray.findIndex( ( ele : any) => Number(ele.followedBY) === Number(followedBY) && Number( ele.followedTO) === Number(followedTO) ) ; 
    if( ind === -1 ){
      const obj = { "followedBY" : followedBY ,  "followedTO" : followedTO } ;
      followArray.push( obj ) ; 
      localStorage.setItem("followArray" , JSON.stringify( followArray )) ; 
    }
    // alert( ind ) ; 
  }

  isFollowingThePerson( followedBY : any , followedTO : any ){
    let followArray : any  = localStorage.getItem("followArray") ; 
    if( !followArray ){
      localStorage.setItem("followArray" , JSON.stringify([])) ; 
    }
    followArray = localStorage.getItem("followArray") ;  
    followArray = JSON.parse( followArray ) ;
    let ind = followArray.findIndex( ( ele : any) => Number(ele.followedBY) === Number(followedBY) && Number( ele.followedTO) === Number(followedTO) ) ; 
    if( ind === -1 ) return false ; 
    return true ; 
  }
  unfollowThePerson(followedBY : any , followedTO : any){

    console.log( followedBY , followedTO)
    let followArray : any  = localStorage.getItem("followArray") ; 
    if( !followArray ){
      localStorage.setItem("followArray" , JSON.stringify([])) ; 
    }
    followArray = localStorage.getItem("followArray") ;  
    followArray = JSON.parse( followArray ) ;
    followArray = followArray.filter( ( ele: any ) => !(Number(ele.followedBY) === Number(followedBY) && Number( ele.followedTO) === Number(followedTO))  )
  
    localStorage.setItem("followArray" , JSON.stringify( followArray )) ; 

  }
  addComment( message : any , userID : any , blogID : any  ){
     let commentArray : any = localStorage.getItem("commentArray") ; 
    if( !commentArray){
      localStorage.setItem("commentArray" , JSON.stringify([])) ; 
    }
    commentArray= localStorage.getItem("commentArray") ;  
    commentArray = JSON.parse( commentArray ) ; 
    let commentID : any = Date.now() ; 
    let obj  = { "commentID" : commentID  , "message" : message , "blogID":blogID , "userID" : userID }  ;
    commentArray.push( obj ) ; 
    localStorage.setItem("commentArray" , JSON.stringify(commentArray) ) ;


  }

  showComment(){
    // alert("!11111111")
    // console.log( this.myBehaviorSubject )  ; 
    this.myBehaviorSubject.next( true ) ; 
    // this.myBehaviorSubject.next( true)  ; 
  }

  hideComment(){
    this.myBehaviorSubject.next( false  ) ; 
    // this.myBehaviorSubject.next( false )  ; 
  }
  
  getMyBlogs(userID:any){
    let allBlogs : any  = localStorage.getItem("allBlogs") ; 
      if( !allBlogs){
        localStorage.setItem("allBlogs" , JSON.stringify([])) ; 

      } 
      allBlogs = localStorage.getItem("allBlogs") ; 
      
      allBlogs = JSON.parse( allBlogs ) ; 

      // let userID : any  = localStorage.getItem("loggedInUserID") ; 
      userID = JSON.parse( userID ) ; 
      if( !userID || !allBlogs ) return [] ; 
       
      allBlogs = allBlogs.filter( ( ele : any ) =>Number( ele.userID ) ===  Number(userID) ) ; 
      return allBlogs ; 
  }

  getUserBlog(blogID : any ){
    let allBlogs : any  = localStorage.getItem("allBlogs") ; 
    if( !allBlogs){
      localStorage.setItem("allBlogs" , JSON.stringify([])) ; 

    } 
    allBlogs = localStorage.getItem("allBlogs") ; 
    
    allBlogs = JSON.parse( allBlogs ) ; 
    let ind = allBlogs.findIndex(( ele : any ) => Number(ele.id) === Number(blogID) ) ; 
    if( ind === -1 ){
      return {} ; 
    }
    return allBlogs[ind] ; 

    
    
  }

  deleteMyBlog( blogID :any ){
    // console.log(" blogID" , blogID  ) ; 
    let allBlogs : any  = localStorage.getItem("allBlogs") ; 
      if( !allBlogs){
        localStorage.setItem("allBlogs" , JSON.stringify([])) ; 

      } 
      allBlogs = localStorage.getItem("allBlogs") ; 
      
      allBlogs = JSON.parse( allBlogs ) ; 

      // let userID : any  = localStorage.getItem("loggedInUserID") ; 
      // userID = JSON.parse( userID ) ; 
      // if( !userID || !allBlogs ) return [] ; 
       
      allBlogs = allBlogs.filter( ( ele : any ) => !(Number( ele.id ) ===  Number(blogID) )  ) ; 
      // return allBlogs ; 
      localStorage.setItem("allBlogs" , JSON.stringify( allBlogs )) ; 
  }

  calculateReadingTime(text:any) {
    // Average reading speed in words per minute (WPM)
    const averageReadingSpeed = 200;
    
    // Split the text into words
    const words = text.split(/\s+/);

    // console.log(words ) ; 
    
    // Calculate the number of words
    const numWords = words.length;
    
    // Calculate reading time in minutes
    const readingTime = Math.ceil(numWords / averageReadingSpeed);
    
    return readingTime;
}

 

  

  
  
}
