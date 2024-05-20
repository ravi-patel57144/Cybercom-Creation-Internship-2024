import { Component } from '@angular/core';
import { FormGroup, Validators,FormControl  } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email :  new FormControl('' , [Validators.required , Validators.email]) , 
    password : new FormControl( '' , [Validators.required ] ) 
  })  

  constructor( private authService : AuthService , private router : Router ){

  }
  submitted(){
    // console.log( this.loginForm ) ; 
    if( this.loginForm.invalid ){
      return ; 
    }

    let email = this.loginForm.value.email , password = this.loginForm.value.password ; 
    email = email?.trim() ; 
    // console.log( email, password ) ; 
    
    // alert("hi ")  ;  
    let ans = this.authService.userExist(email , password )  ; 
   
    if( !ans ){
      alert("Please sign up") ; 
      return ; 
    }
    localStorage.setItem("loggedInUserID" , ans  )  ; 
    this.router.navigateByUrl("/home") ; 
    
  }
}
