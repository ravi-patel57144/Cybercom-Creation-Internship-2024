import { Component,  OnInit , ViewChild } from '@angular/core';
import { BlogsService } from 'src/app/core/services/blogs.service';
import { ActivatedRoute } from '@angular/router';
import exportFromJSON from 'export-from-json'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  username : any = "" ; 
  myBlogs : any = "" ; 
 active : any = true  ; 
 editArticle : any = true ; 

 myProfile : any = true ; 
 contentLoaded : any = false ; 

 @ViewChild('inputFile') inputFile : any = '' ; 

 
 
  constructor( private blogService : BlogsService , private route : ActivatedRoute ){
   
    
   
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(  (params:any )  => {
      console.log(params  ) ;
       let userID : any = params.id ; 
       let userProfile : any = this.blogService.getUserProfile( userID )
       this.username = userProfile.userName ; 
       this.myBlogs = this.blogService.getMyBlogs( userID) ;
       this.blogService.deleteBlogIDSubject.subscribe(( ele : any )=>{
        // alert( ele ) ; 
        this.blogService.deleteMyBlog( ele) ; 
        this.myBlogs = this.blogService.getMyBlogs( userID) ;
        this.contentLoaded = true ; 
       })
      
       
      
         let loggedInUserID = localStorage.getItem("loggedInUserID") ; 
         console.log( loggedInUserID , userID ); 
         this.myProfile = Number(loggedInUserID) === Number(userID) 
            
         
      

       
      //  this.profileUserID = Number(userID ) ;

    }) ; 

   

  }

  setActive(){
    this.active = true ; ;
  }
  setNotActive(){
    this.active = false  ;
  }
   exportBlogs(){
    // alert("Blogs exported ") ; 
    try{
      let data = this.myBlogs ; 
      console.log( data ) ;
      data = data.map((   ele : any )=>{
        let obj = {...ele} ; 
          delete(obj.id) ; 
          delete(obj.userID) ; 
          delete(obj.blogCreationTime) ; 
          obj.description = this.getParaContent( obj.description );
        return obj ;
      } ) ; 
      if( !data ) data = [] ; 
  const fileName = `${this.username}_blogs_${Date.now()}` ; 
  const exportType =  exportFromJSON.types.json ; 
  
  console.log( data , "1111") ; 
   exportFromJSON({ data, fileName, exportType })  ; 
  //  alert("Blog successfully downloaded ") ; 

  
    }catch( err : any ){
          alert( " Error ocured! please try again later ")
    }
    

  }
  getParaContent(htmlString : any ){
    const tempElement = document.createElement('div');
tempElement.innerHTML = htmlString;

// Remove images
tempElement.querySelectorAll('img').forEach(img => img.remove());

// Remove anchor tags
tempElement.querySelectorAll('a').forEach(a => a.remove());

// Extract text content
let textContent = tempElement.textContent || tempElement.innerText;
textContent = textContent.trim() ; 
return textContent ; 

// console.log(textContent.trim())
  }
  importBlogs(){
    // alert("Blogs imported") ; 
    this.inputFile.nativeElement.click() ; 
    console.log( this.inputFile) ; 
  }
  inputFileSubmitted(){
    // alert("submitted")
    let jsonInputFile = this.inputFile.nativeElement.files ; 
    if( jsonInputFile.length > 1 ) {
      alert("Upload only one file ") ; 
    }
    jsonInputFile = jsonInputFile[0] ; 
    if( jsonInputFile.type !== 'application/json'){
      alert("Please upload only JSON File ") ; 
      return ; 
    }
    this.getTheJsonDataFomFile( jsonInputFile ) ; 
    // console.log( jsonInputFile)
    // console.log( this.inputFile.nativeElement.files  )
  }
  getTheJsonDataFomFile( jsonInputFile : any ) {
    // let useBlogArray : any = [] ; 
    console.log( jsonInputFile , jsonInputFile.file ) ; 
    const reader = new FileReader();

    reader.onload = () => {
      let blogJSONData = JSON.parse(reader.result as string);
      this.updateUserBlogs( blogJSONData ) ; 
      // useBlogArray.push(blogJSONData ) ; 
      // console.log( blogJSONData)
    };
  
    reader.onerror = (error) => {
      alert("Error ocurred "); 
      console.error('Error occurred while reading the file:', error);
    };


    reader.readAsText(jsonInputFile );

  } 

  updateUserBlogs( blogJSONData : any ) {

      let blogArray :any  =   this.isProperJSONData( blogJSONData ) ;
      if( !blogArray ){
        alert("Format Is Not Correct !")  ; 
        return ; 
      }
      this.saveTheArray(blogArray) ; 
      console.log( blogArray ) ;
  } 
  isProperJSONData( blogJSONData: any  ){
    let correctJSONData : any = true ; 
    let blogArray  : any = []    ; 
    let loggedInUserID : any = localStorage.getItem("loggedInUserID") ; 
    loggedInUserID = Number( loggedInUserID ) ; 
    for( let ele of blogJSONData ){
      // console.log( ele ) ; 
      if( !ele.title || !ele.category || !ele.description || !ele.primaryImageURL ){
        correctJSONData = false; 
        break ; 
      }
      let eleObj :any = { ...ele} ;
      eleObj.userID = loggedInUserID ; 
      eleObj.id = Date.now() + blogArray.length ;
      eleObj.blogCreationTime = Date.now() 
      blogArray.push( eleObj ) ; 
    }
    if( !correctJSONData){
      return false ; 
    }
    return blogArray ; 
  }
  saveTheArray( blogArray : any ){
      let allBlogs : any  = localStorage.getItem("allBlogs") ; 
      allBlogs = JSON.parse( allBlogs ) ; 
      allBlogs = [ ...allBlogs , ...blogArray ] ; 
      localStorage.setItem("allBlogs"  , JSON.stringify(allBlogs) ) ;

      let loggedInUserID  :any = localStorage.getItem("loggedInUserID") ; 
      loggedInUserID = Number(loggedInUserID)  ;
      this.myBlogs = this.blogService.getMyBlogs( loggedInUserID) ; 
      alert("Blogs Imported Succesfully !" ) ; 

  }

}
