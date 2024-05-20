import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.devlopment';
import { FollowerServiceService } from 'src/app/core/services/follower-service.service';
import { BlogsService } from 'src/app/core/services/blogs.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent {

  showBorder : any = true ; 

   topicsArray : any = [] ; 

   followArray : any = [] ; 

   topicName:any = "" ; 
   followerCount : any = 0 ;
   followingCount : any = 0 ;  


   constructor( private  followerService : FollowerServiceService , private blogService : BlogsService ,  private router : Router ){
    this.topicsArray = environment.allCategories ; 
    this.followers() ;
    this.setFollowCount() ; 
   }

   followers(){
    this.showBorder = true  ; 
    let loggedInUserID : any  = localStorage.getItem("loggedInUserID")
    let followArrayID : any = this.followerService.getFollowers( loggedInUserID ) ; 
    this.followArray= followArrayID.reduce(( acc : any ,  ele : any )=>{
          let name = this.blogService.getUserName(ele.followedBY ) ; 
          let obj = { userID : ele.followedBY , userName : name} ; 
          acc.push( obj) ; 
          return acc ; 
    } , [] )

    console.log("this.follwArrat" , this.followArray)
     
    // alert("followers") ; 
    
   }
   following(){
    this.showBorder = false ; 
    let loggedInUserID : any  = localStorage.getItem("loggedInUserID")
    let followArrayID : any = this.followerService.getFollowings( loggedInUserID ) ; 
    this.followArray= followArrayID.reduce(( acc : any ,  ele : any )=>{
          let name = this.blogService.getUserName(ele.followedTO ) ; 
          let obj = { userID : ele.followedTO , userName : name} ; 
          acc.push( obj) ; 
          return acc ; 
    } , [] )
   }


    openProfile( userID : any ){
      this.router.navigateByUrl( "/home/profile?id="+userID) ; 
    }
    serachByTag( ele : any ){
      // alert( ele ) ; 
      this.topicName = ele ;
      this.followerService.topicSearchKeySubject.next(ele) ; 
    }

    setBorder(ele  : any ){
      return this.topicName === ele; 
    }
    setFollowCount(){
      let loggedInUserID : any  = localStorage.getItem("loggedInUserID")
      let followArrayID : any = this.followerService.getFollowers( loggedInUserID ) ;
      this.followerCount = followArrayID.length ; 

      let followingArrayID : any = this.followerService.getFollowings( loggedInUserID ) ; 
      this.followingCount = followingArrayID.length ; 

    }

}
