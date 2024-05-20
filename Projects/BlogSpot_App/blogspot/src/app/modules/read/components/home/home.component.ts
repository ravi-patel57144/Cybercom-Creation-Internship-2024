import { Component , OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookmarkService } from 'src/app/core/services/bookmark.service';
import { BlogsService } from 'src/app/core/services/blogs.service';
import { FollowerServiceService } from 'src/app/core/services/follower-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  title:any ='pagination' ; 
  page:any = 1   ; 
  count:any =0 ; 
  tableSize:any =2 ; 
  tableSizes:any =[1,2,3,4] ; 
   parentData : any = " this is the parent " ;
   
  allBlogs : any = []  ; 
  originalAllBlogs : any = [] ;
  
  contentLoaded : any = false; 
  
  constructor(private router :ActivatedRoute , private bookMarkService :BookmarkService, private blogService :BlogsService , private followService:FollowerServiceService  ){
   
  }
  ngOnInit(): void {
    this.router.queryParams.subscribe(  (params:any )  => { 
      let bookMark : any = params.bookMarks ; 
      // alert( bookMark ) ; 
      if( bookMark === 'true'){
    
        let loggedInUserID = localStorage.getItem("loggedInUserID") ; 
        this.allBlogs  = this.bookMarkService.getAllBookMarkedBlogs( loggedInUserID )
      }else{
       this.getAllBlogs( );
      }
      
     
    })

    this.blogService.blogSearchKeySubject.subscribe(( val : any )=>{
      // alert( val ) ; 
      // console.log( val ) ;
      // console.log( this.allBlogs)
      console.log( this.followService.topicSearchKeySubject )
      // this.allBlogs = this.originalAllBlogs.filter( ( ele : any )=>  ele.title.toLowerCase().includes(val.toLowerCase())) ; 
      this.applyFilters() ; 
    }) ; 

    this.followService.topicSearchKeySubject.subscribe((val : any )=>{
      // console.log( this.allBlogs ) ; 
      // // alert( val );  
      // if( !val  || val === 'All') {
      //   this.allBlogs = this.originalAllBlogs ; 
      //   return  ; 
      // }
      // this.allBlogs = this.originalAllBlogs.filter( ( ele : any )=> ele.category === val ) ; 
      this.applyFilters() ; 
    })
  }
  getAllBlogs(){
    this.contentLoaded = false ;  
    this.allBlogs  = localStorage.getItem("allBlogs") ;
    if( !this.allBlogs ){
      this.allBlogs =[] ; 
    }else{
      this.allBlogs = JSON.parse( this.allBlogs ) ;
      // console.log( this.allBlogs ) ;  
    }
    this.contentLoaded = true ; 
    this.originalAllBlogs = this.allBlogs  ;
  }

  applyFilters(){
    
    let val : any = this.blogService.blogSearchKeySubject._value ; 
    // alert( val ) ; 
    this.allBlogs = this.originalAllBlogs.filter( ( ele : any )=>  ele.title.toLowerCase().includes(val.toLowerCase()))

    val = this.followService.topicSearchKeySubject._value ; 
    if( !val  || val === 'All') {
      // this.allBlogs = this.originalAllBlogs ; 
      return  ; 
    }
    this.allBlogs = this.allBlogs.filter( ( ele : any )=> ele.category === val ) ; 
  }
  onTableDataChange( event : any){
    this.page = event ; 
    this.getAllBlogs() ;
  }

  onTableSizeChange( event : any ){
    this.tableSize = event.target.value ; 
    this.page = 1; 
    this.getAllBlogs() ;
  }
   
}
