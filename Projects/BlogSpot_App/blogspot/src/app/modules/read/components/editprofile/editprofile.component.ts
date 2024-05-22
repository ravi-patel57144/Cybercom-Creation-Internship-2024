import { Component , OnInit } from '@angular/core';
import { BlogsService } from 'src/app/core/services/blogs.service';
import { ActivatedRoute } from '@angular/router';

import {KeyValue} from '@angular/common';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  profileObj : any = {} ;
  profileObjKeys : any = [] ;
  popupName : any = "popupName" ;
 popupTitle : any = "popupTitle"
 showPopup : any = false  ;
 canEdit = false ;
 profileUserID : any = "" ;

  constructor( private blogsService : BlogsService , private route: ActivatedRoute){


  }
  popupVisible(title:any){
    this.popupName = title ;
    console.log( this.profileObj[title])
    this.popupTitle = this.profileObj[title]
    console.log( this.popupTitle );
    this.showPopup = true ;

  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(  (params:any )  => {
      console.log(params  ) ;
       let userID : any = params.id ;
       this.profileUserID = Number(userID ) ;


      this.profileObj = this.blogsService.getUserProfile(userID) ;
      this.profileObjKeys = Object.keys( this.profileObj ) ;
      this.profileObjKeys = this.profileObjKeys.filter( ( ele : any  )=> !( ele === 'id') ) ;



       let loggedInUserID : any = localStorage.getItem( 'loggedInUserID') ;
       loggedInUserID = Number( loggedInUserID ) ;

       this.canEdit = Number(userID) === loggedInUserID;
      if( !this.canEdit ){
        this.profileObjKeys = this.profileObjKeys.filter( ( ele : any  )=> !( ele === 'password') ) ;
      }


  } ) }
  removePopup(){
    this.showPopup = false ;
  }

  saveDetails(){
    this.profileObj[this.popupName] = this.popupTitle  ;
    this.blogsService.saveUserProfile( this.profileObj , this.profileUserID ) ;
    this.showPopup = false ;
  }
}
