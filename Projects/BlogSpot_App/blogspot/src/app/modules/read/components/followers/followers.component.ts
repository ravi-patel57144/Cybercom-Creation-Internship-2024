import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FollowerServiceService } from 'src/app/core/services/follower-service.service';
import { BlogsService } from 'src/app/core/services/blogs.service';
import { Blog } from 'src/app/model/blog.model';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  showBorder: any = true;
  topicsArray: string[] = [];
  followArray: any[] = [];
  topicName: string = "";
  followerCount: number = 0;
  followingCount: number = 0;

  constructor(
    private followerService: FollowerServiceService,
    private blogService: BlogsService,
    private router: Router
  ) {
    this.followers();
    this.setFollowCount();
  }

  ngOnInit(): void {
    this.loadRecommendedTopics();
  }

  followers() {
    this.showBorder = true;
    let loggedInUserID: any = localStorage.getItem("loggedInUserID");
    let followArrayID: any = this.followerService.getFollowers(loggedInUserID);
    this.followArray = followArrayID.reduce((acc: any, ele: any) => {
      let name = this.blogService.getUserName(ele.followedBY);
      let obj = { userID: ele.followedBY, userName: name };
      acc.push(obj);
      return acc;
    }, []);
  }

  following() {
    this.showBorder = false;
    let loggedInUserID: any = localStorage.getItem("loggedInUserID");
    let followArrayID: any = this.followerService.getFollowings(loggedInUserID);
    this.followArray = followArrayID.reduce((acc: any, ele: any) => {
      let name = this.blogService.getUserName(ele.followedTO);
      let obj = { userID: ele.followedTO, userName: name };
      acc.push(obj);
      return acc;
    }, []);
  }

  openProfile(userID: any) {
    this.router.navigateByUrl("/home/profile?id=" + userID);
  }

  serachByTag(ele: string) {
    this.topicName = ele;
    let loggedInUserID: any = localStorage.getItem("loggedInUserID");
    let followings: any[] = this.followerService.getFollowings(loggedInUserID);
    let followedUserIds = followings.map(follow => follow.followedTO);

    let blogsMatchingTag: Blog[] = [];
    followedUserIds.forEach(userID => {
      let userBlogs: Blog[] = this.blogService.getUserBlogs(userID);
      userBlogs.forEach((blog: Blog) => {
        let categories = Array.isArray(blog.category) ? blog.category : blog.category.split(',');
        if (categories.map(category => category.trim()).includes(ele)) {
          blogsMatchingTag.push(blog);
        }
      });
    });

    this.followerService.topicSearchKeySubject.next(ele);
  }

  setBorder(ele: any) {
    return this.topicName === ele;
  }

  setFollowCount() {
    let loggedInUserID: any = localStorage.getItem("loggedInUserID");
    let followArrayID: any = this.followerService.getFollowers(loggedInUserID);
    this.followerCount = followArrayID.length;

    let followingArrayID: any = this.followerService.getFollowings(loggedInUserID);
    this.followingCount = followingArrayID.length;
  }

  followBack(userID: any) {
    let loggedInUserID: any = localStorage.getItem("loggedInUserID");
    this.followerService.followBack(loggedInUserID, userID);
    this.setFollowCount();
    this.followers();
  }

  unfollow(userID: any) {
    let loggedInUserID: any = localStorage.getItem("loggedInUserID");
    this.followerService.unfollow(loggedInUserID, userID);
    this.setFollowCount();
    this.followers();
  }

  isFollowing(userID: any): boolean {
    let loggedInUserID: any = localStorage.getItem("loggedInUserID");
    let followings: any[] = this.followerService.getFollowings(loggedInUserID);
    return followings.some((follow: any) => follow.followedTO === userID);
  }

  loadRecommendedTopics() {
    let loggedInUserID: any = localStorage.getItem("loggedInUserID");
    let followings: any[] = this.followerService.getFollowings(loggedInUserID);
    let followedUserIds = followings.map(follow => follow.followedTO);

    let topicsSet = new Set<string>();
    followedUserIds.forEach(userID => {
      let userBlogs: Blog[] = this.blogService.getUserBlogs(userID);
      userBlogs.forEach((blog: Blog) => {
        if (Array.isArray(blog.category)) {
          blog.category.forEach((category: string) => {
            topicsSet.add(category.trim());
          });
        } else if (typeof blog.category === 'string') {
          // Handle the case where category is a comma-separated string
          blog.category.split(',').forEach((category: string) => {
            topicsSet.add(category.trim());
          });
        } else {
          console.warn(`Blog ID ${blog.id} has invalid category: `, blog.category);
        }
      });
    });

    this.topicsArray = Array.from(topicsSet);
    console.log('Topics Array: ', this.topicsArray); // Debug log
  }
}
