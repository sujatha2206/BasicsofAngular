import { Injectable } from '@angular/core';
import {  HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import{environment } from '../../environments/environment';

export interface  AuthReponseData{
  idToken:	string,	//A Firebase Auth ID token for the newly created user.
email	:string,	//The email for the newly created user.
refreshToken:	string,//	A Firebase Auth refresh token for the newly created user.
expiresIn:	string,//	The number of seconds in which the ID token expires.
localId:string, //The uid of the newly created user.
registered?:string//Whether the email is for an existing account.
}
@Injectable({
  providedIn:'root'
})
export class AuthService{
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer:any;
  constructor(private http:HttpClient,private router:Router){

  }
signup(email:string,password:string){
return this.http.post<AuthReponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseApiKey, {
email:email,
password:password,
returnSecureToken:true

}).pipe(catchError(this.handleError),tap(responseData=>{
  this.handleAuthentication(responseData.email,responseData.localId,responseData.idToken,+responseData.expiresIn);

 }));
}
login(email:string,password:string){
  return this.http.post<AuthReponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseApiKey,{
    email:email,
    password:password,
    returnSecureToken:true
  }).pipe(catchError(this.handleError),tap(responseData=>{
   this.handleAuthentication(responseData.email,responseData.localId,responseData.idToken,+responseData.expiresIn);

  }));

}
private handleAuthentication(email:string,userId:string,token:string,expiresIn:number){
  const expirationDate = new Date(new Date().getTime() + expiresIn*1000);
  const user = new User(email,userId,token,expirationDate);
  this.user.next(user);
  this.autoLogout(expiresIn * 1000);
  localStorage.setItem('userData',JSON.stringify(user));
}
private handleError(errorResponse:HttpErrorResponse){
  let errorMessage='An unknown Error occured';
  if(!errorResponse.error || !errorResponse.error.error){
    return throwError(errorMessage);
  };

  switch(errorResponse.error.error.message){
    case 'EMAIL_EXISTS':
      errorMessage="This Email exists already";
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage='This Email does not exists';
      break;
    case 'INVALID_PASSWORD':
      errorMessage=" The password is invalid";
      break;

  }
  return throwError(errorMessage);

}
autoLogin(){
  const userData:{
    email:string,
    id:string,
    _token:string,
    _tokenExpirationDate:string
  }=JSON.parse(localStorage.getItem('userData'));
  if(!userData){
    return;
  }
  const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
  console.log(loadedUser.token);
  if(loadedUser.token){
    this.user.next(loadedUser);
    console.log(new Date(userData._tokenExpirationDate).getTime() );
    const expirationDuration= new Date(userData._tokenExpirationDate).getTime()-
     new Date().getTime();

   this.autoLogout(expirationDuration);
  }
}
logout(){
this.user.next(null);
this.router.navigate(['/auth']);
localStorage.removeItem('userData');
if(this.tokenExpirationTimer){
  clearTimeout(this.tokenExpirationTimer);
}
this.tokenExpirationTimer=null;
}
autoLogout(expirationDuration:number){
  console.log("expirationDuration"+expirationDuration);
 this.tokenExpirationTimer= setTimeout(()=>{
    this.logout();
  },expirationDuration);

}

}
