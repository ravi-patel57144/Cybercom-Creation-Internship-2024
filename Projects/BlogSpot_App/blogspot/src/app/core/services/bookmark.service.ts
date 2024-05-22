import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  constructor() { }
  saveTheBlog(blogID : any , userID : any ){
    let blogSaved : any = localStorage.getItem("blogSaved") ;
    if( !blogSaved)      localStorage.setItem("blogSaved" , JSON.stringify([])) ;
    blogSaved   = localStorage.getItem("blogSaved") ;
  blogSaved = JSON.parse( blogSaved ) ;
  let ind : any = blogSaved.findIndex( ( ele : any ) => Number(ele.blogID) === Number(blogID) && Number(ele.userID) === Number(userID)) ;
  if( ind === -1 ){
    let blogObj : any = { "blogID" : blogID, "userID" : userID } ;
    blogSaved.push( blogObj ) ;
    localStorage.setItem("blogSaved" , JSON.stringify(blogSaved)) ;

  }

  }
  unsaveTheBlog(blogID : any , userID : any){
    let blogSaved : any = localStorage.getItem("blogSaved") ;
    if( !blogSaved)      localStorage.setItem("blogSaved" , JSON.stringify([])) ;
    blogSaved   = localStorage.getItem("blogSaved") ;
  blogSaved = JSON.parse( blogSaved ) ;
  blogSaved = blogSaved.filter( ( ele : any ) => !(Number(ele.blogID) === Number(blogID)  && Number(ele.userID) === Number(userID) ) )  ;


    localStorage.setItem("blogSaved" , JSON.stringify(blogSaved)) ;


  }
  isBlogSaved(blogID : any , userID : any ){
    let blogSaved : any = localStorage.getItem("blogSaved") ;
    if( !blogSaved)      localStorage.setItem("blogSaved" , JSON.stringify([])) ;
    blogSaved   = localStorage.getItem("blogSaved") ;
  blogSaved = JSON.parse( blogSaved ) ;
  let ind : any = blogSaved.findIndex( ( ele : any ) => Number(ele.blogID) === Number(blogID) && Number(ele.userID) === Number(userID) ) ;
  if( ind === -1 ) return false ;
  return true  ;
}

  getAllBookMarkedBlogs(userID : any ){
    let blogSaved : any = localStorage.getItem("blogSaved") ;
    blogSaved = JSON.parse( blogSaved)
    if( !blogSaved)   {
      localStorage.setItem("blogSaved" , JSON.stringify([])) ;
      blogSaved = [] ;

    }
    let blogSavedByUser : any = blogSaved.reduce( ( acc : any , ele : any  )=>{
      if( Number(ele.userID) === Number( userID ) ){
        acc.push( ele.blogID) ;
      }
      return acc ;
    } , [] ) ;
    console.log( " blogSavedByUser " , blogSavedByUser ) ;
    let allBlogs : any  = localStorage.getItem("allBlogs") ;
    allBlogs = JSON.parse( allBlogs ) ;
    allBlogs = !allBlogs ? [] : allBlogs   ;
    allBlogs = allBlogs.filter( ( ele1 : any)=>{
      let ind : any = blogSavedByUser.findIndex( ( ele2: any )=> Number( ele2) === Number(ele1.id)) ;
      if( ind === -1 ) return false ;
      return true ;
    })
    return allBlogs ;
  }
}
