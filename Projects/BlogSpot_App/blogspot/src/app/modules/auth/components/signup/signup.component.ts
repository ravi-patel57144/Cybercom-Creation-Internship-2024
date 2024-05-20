import { Component } from '@angular/core';
import { FormGroup, Validators,FormControl  } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css' , "../login/login.component.css"]
})
export class SignupComponent {
  loginForm = new FormGroup({
    name : new FormControl('' , [Validators.required  ]) ,
    email :  new FormControl('' , [Validators.required , Validators.email]) ,
    password : new FormControl( '' , [Validators.required ] )
  })

  constructor( private authservice : AuthService , private router : Router  ){

  }
  submitted(){
    let email = this.loginForm.value.email , password = this.loginForm.value.password , userName  = this.loginForm.value.name  ;
    email = email?.trim() ;
    let inCorrectPassword :any = this.authservice.validatePassword( password ) ;
    if( inCorrectPassword){
      alert(inCorrectPassword) ;
      return ;
    }
    let res = this.authservice.createUser( email , password , userName ) ;
    if( !res ){
      alert("User already exist") ;
      return ;
    }
    this.router.navigateByUrl("/" ) ;


  }

}
