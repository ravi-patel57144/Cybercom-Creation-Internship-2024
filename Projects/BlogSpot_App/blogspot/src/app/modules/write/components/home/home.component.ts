import { FormGroup, Validators,FormControl } from '@angular/forms';
import { Component , OnInit, OnDestroy } from '@angular/core';
import { BlogsService } from 'src/app/core/services/blogs.service';
import { ActivatedRoute } from '@angular/router';
import { Editor } from 'ngx-editor';

// import 
// import { AngularEditorConfig } from '@kolkov/angular-editor';
// import { Editor } from 'ngx-editor';

// import { FormsModule } from '@angular/forms';

// import { BlogsService } from 'src/app/core/services/blogs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy{
  editor: any = "";
  html = '';

  htmlContent : any = "";
  // config: AngularEditorConfig = {
    
  //   editable: true,
  //   spellcheck: true,
  //   height: '25rem',
  //   minHeight: '5rem',
  //   placeholder: 'Enter text here...',
  //   translate: 'no',
  //   defaultParagraphSeparator: 'p',
  //   defaultFontName: 'Arial',
   
  // };
  articleToEdit : any = false ; 
  articleToEditID : any = "" ; 
  // title : any = "" ; 
  entryForm:any = new FormGroup({
    title :  new FormControl('' , [Validators.required ]) , 
    category : new FormControl('' , [Validators.required ]) , 
    description : new FormControl( '' , [Validators.required ] )  , 
    primaryImageURL : new  FormControl( '' , [Validators.required ] )  
  })  

  ngOnInit(): void {

    this.editor = new Editor();
    this.route.queryParams.subscribe(  (params:any )  => {
      console.log(params  ) ;
       let userID : any = params.id ; 
      //  alert( userID) ; 
       if( userID ){
        this.articleToEditID = userID ; 
        this.articleToEdit= true ; 

        let blogObj : any = this.blogsService.getUserBlog( this.articleToEditID )  ; 
        console.log( blogObj ) ; 

        this.entryForm  = new FormGroup({
          title :  new FormControl(blogObj.title , [Validators.required ]) , 
          category : new FormControl( blogObj.category  , [Validators.required ]) , 
          description : new FormControl( blogObj.description , [Validators.required ] )  , 
          primaryImageURL : new  FormControl( blogObj.primaryImageURL , [Validators.required ] )  
        })  



       }
      //  this.profileUserID = Number(userID ) ;

    })
   
  }
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  constructor( private blogsService : BlogsService , private route : ActivatedRoute){

  }
  allCategories : any = [ 'React' , 'Node', 'Javascript' , 'Angular' , 'Web Development'] 
  formSubmitted(){
    // console.log( this.html ) ; 
    if(  this.entryForm.invalid){
      alert( "Please enter all the fields ") ; 
      return ; 
    }
    let title = this.entryForm.value.title , category = this.entryForm.value.category  , description  = this.entryForm.value.description , 
    primaryImageURL = this.entryForm.value.primaryImageURL ;
    // console.log( title , category , description ) ; 
    // console.log( this.entryForm ) ; 
    // let email = this.entryForm.valueChanges.
    // console.log( description) ; 
    // return ; 

    // let ans = this.blogsService.createNewBlog( )
    
    // alert( this.entryForm.invalid ) ;
    // console.log( this.entryForm ) ; 
    if( this.articleToEdit ){
      // alert("edited sucesfult ") ; c
      console.log( primaryImageURL )
      this.blogsService.editBlog( this.articleToEditID , title, category, description , primaryImageURL ) ; 
      alert("Blog has been edite successfully " ) ; 
      return ; 
    }
    let ans = this.blogsService.createNewBlog( title , category, description , primaryImageURL )   ; 
    alert(  " new blog succraafully created ") ; 
    this.entryForm.reset() ;
    this.entryForm = new FormGroup({
      title :  new FormControl('' , [Validators.required ]) , 
      category : new FormControl('' , [Validators.required ]) , 
      description : new FormControl( '' , [Validators.required ] ) , 
      primaryImageURL : new FormControl( '' , [Validators.required ] ) 
    })  
  }
}
