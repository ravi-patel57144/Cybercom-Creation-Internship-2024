import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  constructor() {
    this.initializeSavedBlogs();
  }

  private initializeSavedBlogs() {
    let savedBlog = localStorage.getItem("blogSaved");
    if (!savedBlog) {
      const defaultsavedBlogs = [
        { blogID: 1, userID: 1 },
        { blogID: 1, userID: 2 },
        { blogID: 1, userID: 3 },
        { blogID: 1, userID: 4 },
        { blogID: 1, userID: 5 },
        { blogID: 1, userID: 6 },
        { blogID: 1, userID: 7 },
        { blogID: 1, userID: 8 },
        { blogID: 1, userID: 9 },
        { blogID: 1, userID: 10 },
        { blogID: 1, userID: 11 },
        { blogID: 1, userID: 12 },
        { blogID: 1, userID: 13 },
        { blogID: 1, userID: 14 },
        { blogID: 1, userID: 15 },
      ];
      localStorage.setItem("blogSaved", JSON.stringify(defaultsavedBlogs));
    }
  }

  saveTheBlog(blogID: any, userID: any) {
    let blogSaved: any = localStorage.getItem("blogSaved");
    if (!blogSaved) localStorage.setItem("blogSaved", JSON.stringify([]));
    blogSaved = localStorage.getItem("blogSaved");
    blogSaved = JSON.parse(blogSaved);
    let ind: any = blogSaved.findIndex((ele: any) => Number(ele.blogID) === Number(blogID) && Number(ele.userID) === Number(userID));
    if (ind === -1) {
      let blogObj: any = { "blogID": blogID, "userID": userID };
      blogSaved.push(blogObj);
      localStorage.setItem("blogSaved", JSON.stringify(blogSaved));

    }

  }
  unsaveTheBlog(blogID: any, userID: any) {
    let blogSaved: any = localStorage.getItem("blogSaved");
    if (!blogSaved) localStorage.setItem("blogSaved", JSON.stringify([]));
    blogSaved = localStorage.getItem("blogSaved");
    blogSaved = JSON.parse(blogSaved);
    blogSaved = blogSaved.filter((ele: any) => !(Number(ele.blogID) === Number(blogID) && Number(ele.userID) === Number(userID)));


    localStorage.setItem("blogSaved", JSON.stringify(blogSaved));


  }
  isBlogSaved(blogID: any, userID: any) {
    let blogSaved: any = localStorage.getItem("blogSaved");
    if (!blogSaved) localStorage.setItem("blogSaved", JSON.stringify([]));
    blogSaved = localStorage.getItem("blogSaved");
    blogSaved = JSON.parse(blogSaved);
    let ind: any = blogSaved.findIndex((ele: any) => Number(ele.blogID) === Number(blogID) && Number(ele.userID) === Number(userID));
    if (ind === -1) return false;
    return true;
  }

  getAllBookMarkedBlogs(userID: any) {
    let blogSaved: any = localStorage.getItem("blogSaved");
    blogSaved = JSON.parse(blogSaved)
    if (!blogSaved) {
      localStorage.setItem("blogSaved", JSON.stringify([]));
      blogSaved = [];

    }
    let blogSavedByUser: any = blogSaved.reduce((acc: any, ele: any) => {
      if (Number(ele.userID) === Number(userID)) {
        acc.push(ele.blogID);
      }
      return acc;
    }, []);
    console.log(" blogSavedByUser ", blogSavedByUser);
    let allBlogs: any = localStorage.getItem("allBlogs");
    allBlogs = JSON.parse(allBlogs);
    allBlogs = !allBlogs ? [] : allBlogs;
    allBlogs = allBlogs.filter((ele1: any) => {
      let ind: any = blogSavedByUser.findIndex((ele2: any) => Number(ele2) === Number(ele1.id));
      if (ind === -1) return false;
      return true;
    })
    return allBlogs;
  }
}
