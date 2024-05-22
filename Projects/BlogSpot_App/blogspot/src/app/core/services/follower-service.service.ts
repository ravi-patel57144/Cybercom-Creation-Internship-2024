import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowerServiceService {

  public topicSearchKeySubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {
    this.initializefollowers();
  }

  private initializefollowers() {
    let followers = localStorage.getItem("followArray");
    if (!followers) {
      const defaultfollowers = [
        { followedBY: 1, followedTO: 2 },
        { followedBY: 1, followedTO: 3 },
        { followedBY: 1, followedTO: 4 },
        { followedBY: 2, followedTO: 3 },
        { followedBY: 2, followedTO: 5 },
        { followedBY: 3, followedTO: 1 },
        { followedBY: 3, followedTO: 6 },
        { followedBY: 4, followedTO: 2 },
        { followedBY: 4, followedTO: 7 },
        { followedBY: 5, followedTO: 1 },
        { followedBY: 5, followedTO: 8 },
        { followedBY: 6, followedTO: 2 },
        { followedBY: 6, followedTO: 9 },
        { followedBY: 7, followedTO: 3 },
        { followedBY: 7, followedTO: 10 },
        { followedBY: 8, followedTO: 4 },
        { followedBY: 8, followedTO: 11 },
        { followedBY: 9, followedTO: 5 },
        { followedBY: 9, followedTO: 12 },
        { followedBY: 10, followedTO: 6 },
        { followedBY: 10, followedTO: 13 },
        { followedBY: 11, followedTO: 7 },
        { followedBY: 11, followedTO: 14 },
        { followedBY: 12, followedTO: 8 },
        { followedBY: 12, followedTO: 15 },
        { followedBY: 13, followedTO: 9 },
        { followedBY: 13, followedTO: 1 },
        { followedBY: 14, followedTO: 10 },
        { followedBY: 14, followedTO: 2 },
        { followedBY: 15, followedTO: 11 },
        { followedBY: 15, followedTO: 3 },
        { followedBY: 16, followedTO: 12 },
        { followedBY: 16, followedTO: 4 },
        { followedBY: 17, followedTO: 13 },
        { followedBY: 17, followedTO: 5 },
        { followedBY: 18, followedTO: 14 },
        { followedBY: 18, followedTO: 1 },
        { followedBY: 19, followedTO: 15 },
        { followedBY: 19, followedTO: 2 },
        { followedBY: 20, followedTO: 1 },
        { followedBY: 20, followedTO: 3 },
        { followedBY: 1, followedTO: 2 },
        { followedBY: 1, followedTO: 3 },
        { followedBY: 2, followedTO: 4 },
        { followedBY: 2, followedTO: 5 },
        { followedBY: 3, followedTO: 6 },
        { followedBY: 3, followedTO: 7 },
        { followedBY: 4, followedTO: 8 },
        { followedBY: 4, followedTO: 9 },
        { followedBY: 5, followedTO: 10 },
        { followedBY: 5, followedTO: 11 },
        { followedBY: 1, followedTO: 12 },
        { followedBY: 1, followedTO: 13 },
        { followedBY: 2, followedTO: 14 },
        { followedBY: 2, followedTO: 15 },
        { followedBY: 3, followedTO: 1 },
        { followedBY: 3, followedTO: 2 },
        { followedBY: 4, followedTO: 3 },
        { followedBY: 4, followedTO: 4 },
        { followedBY: 5, followedTO: 5 },
        { followedBY: 5, followedTO: 6 }
      ];
      localStorage.setItem("followArray", JSON.stringify(defaultfollowers));
    }
  }

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
