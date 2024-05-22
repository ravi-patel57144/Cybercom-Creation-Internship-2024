import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowerServiceService {

  public topicSearchKeySubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  getFollowers(userID: any) {
    let followArray: any = localStorage.getItem("followArray");
    followArray = JSON.parse(followArray);
    if (!followArray) {
      followArray = [];
      localStorage.setItem("followArray", JSON.stringify([]));
    }

    followArray = followArray.filter((ele: any) => Number(ele.followedTO) === Number(userID));
    return followArray;
  }

  getFollowings(userID: any) {
    let followArray: any = localStorage.getItem("followArray");
    followArray = JSON.parse(followArray);
    if (!followArray) {
      followArray = [];
      localStorage.setItem("followArray", JSON.stringify([]));
    }

    followArray = followArray.filter((ele: any) => Number(ele.followedBY) === Number(userID));
    return followArray;
  }

  followBack(loggedInUserID: any, userID: any) {
    let followArray: any = localStorage.getItem("followArray");
    followArray = JSON.parse(followArray);
    if (!followArray) {
      followArray = [];
    }

    let index = followArray.findIndex((ele: any) => ele.followedTO === userID && ele.followedBY === loggedInUserID);
    if (index === -1) {
      followArray.push({ followedTO: userID, followedBY: loggedInUserID });
      localStorage.setItem("followArray", JSON.stringify(followArray));
    }
  }

  unfollow(loggedInUserID: any, userID: any) {
    let followArray: any = localStorage.getItem("followArray");
    followArray = JSON.parse(followArray);
    if (!followArray) {
      return;
    }

    let index = followArray.findIndex((ele: any) => ele.followedTO === userID && ele.followedBY === loggedInUserID);
    if (index !== -1) {
      followArray.splice(index, 1);
      localStorage.setItem("followArray", JSON.stringify(followArray));
    }
  }

  // Method to get blogs of followed users
  getBlogsOfFollowedUsers(userID: any) {
    let followings = this.getFollowings(userID);
    let followedUserIDs = followings.map((following: any) => following.followedTO);
    let allBlogsString = localStorage.getItem("allBlogs");
    let allBlogs = allBlogsString ? JSON.parse(allBlogsString) : [];
    let blogsOfFollowedUsers = allBlogs.filter((blog: any) => followedUserIDs.includes(blog.userID));
    return blogsOfFollowedUsers;
  }

  isFollowingUser(loggedInUserID: any, userID: any): boolean {
    let followings = this.getFollowings(loggedInUserID);
    return followings.some((following: any) => following.followedTO === userID);
  }

}
