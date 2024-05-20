import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowerServiceService {

  // public topicSearchSubject 
  public topicSearchKeySubject :any ;

  constructor() {
    this.topicSearchKeySubject = new BehaviorSubject<any>("") ; 
   }

  getFollowers( userID : any ){
      let followArray : any = localStorage.getItem("followArray") ; 
      followArray = JSON.parse( followArray) ; 
      if( !followArray){
        followArray  = [] ; 
        localStorage.setItem("followArray" , JSON.stringify([])) ; 
      }

      followArray = followArray.filter(( ele : any ) => Number(ele.followedTO) === Number( userID ) ) ; 
      console.log( followArray ); 
      return followArray ; 
  }

  getFollowings(userID : any){
    let followArray : any = localStorage.getItem("followArray") ; 
      followArray = JSON.parse( followArray) ; 
      if( !followArray){
        followArray  = [] ; 
        localStorage.setItem("followArray" , JSON.stringify([])) ; 
      }

      followArray = followArray.filter(( ele : any ) => Number(ele.followedBY) === Number( userID ) ) ; 
      // console.log( followArray ); 
      return followArray ; 
  }

  
}
