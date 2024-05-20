import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.devlopment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usersURL : string = environment.usersURL ; 
  constructor(private http:HttpClient) { }
  fetchUsers(){

    return this.http.get( this.usersURL )

  }

  userExist( email:any , password:any  ){
    // alert( email ) ;
    let allUsers : any  = localStorage.getItem("allUsers") ; 
    allUsers = JSON.parse( allUsers ) ; 
    if( !allUsers ){
      return false ; 
    }

    let ind = allUsers.findIndex( (ele:any)   => ele.email === email && ele.password === password  ) ; 
    
    // alert( ind ) ; 
   
    if( ind === -1 ) return false ; 
    return allUsers[ind].id ; 
    // return true ; 
  }

  createUser( email : any , password : any , userName:any){
    let allUsers : any  = localStorage.getItem("allUsers") ; 
    if( !allUsers ){
      localStorage.setItem("allUsers" , JSON.stringify([]) ) ; 
    }
    let res = this.userExist( email , password ) ; 

    if( res ){
      return false ; 
    }
   
    allUsers = localStorage.getItem("allUsers") ; 
    allUsers = JSON.parse( allUsers ) ; 
    // if( !allUsers ){
    //   localStorage.setItem("allUsers" , JSON.stringify([]) ) ; 
    
   
    let id = Date.now(); 
    let obj = { "email" : email , "password" : password , "id" : id , "userName" : userName  , tagLine :"" , github : ''  , linkedIn : '' , domain:''} ; 
    allUsers.push( obj )  ;
    localStorage.setItem("allUsers" , JSON.stringify( allUsers ) ) ; 
    return true ; 
  }
   validatePassword(password:any) {
    // Minimum length requirement
    const minLength = 8;
    
    // Regular expressions for checking various criteria
    const containsUpperCase = /[A-Z]/.test(password);
    // alert(password)
    // alert( containsUpperCase) ; 
    if( !containsUpperCase){
      return "Password should have Uppercase"  ; 
    }
    const containsLowerCase = /[a-z]/.test(password);
    if( !containsLowerCase){
      return "Password should have lowerCase"  ; 
    }
    const containsNumbers = /\d/.test(password);
    if( !containsNumbers){
      return "Password should have Number"  ; 
    }
    const containsSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    if( !containsSpecialChars){
      return "Password should have Special Character"  ; 
    }
    
    // Check if password meets all criteria
    const isValidLength = password.length >= minLength;
    if( !isValidLength){
      return "Password should have min 8 letters"  ; 
    }
  
    return "";
}
}
