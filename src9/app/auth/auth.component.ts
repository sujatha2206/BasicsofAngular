import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthReponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';
//import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy{
  @ViewChild(PlaceholderDirective) alertHost :PlaceholderDirective;
  private closeSub:Subscription;
  constructor(private auth:AuthService,private router:Router,private componentFactoryResolver:ComponentFactoryResolver){}
isLoggedIn = false;
isLoading=false;
error:string=null;

onSwitchMode(){
  this.isLoggedIn=!this.isLoggedIn;
}
ngOnDestroy(){
  if(this.closeSub){
  this.closeSub.unsubscribe();
  }
}
onSubmit(form:NgForm){
  if(!form.valid){
    return;
  }
  const email= form.value.email;
  const password= form.value.password;
  let authObs:Observable<AuthReponseData>;
  if(this.isLoggedIn){
    authObs = this.auth.login(email,password);
 }else{
   this.isLoading=true;
   authObs= this.auth.signup(email,password);
  }
  authObs.subscribe(resonseData=>{
    console.log(resonseData);
    this.isLoading=false;
    this.router.navigate(['./recipes']);
  },errorMessage=>{
    console.log(errorMessage);
    this.error=errorMessage;
    this.showErrorAlert(errorMessage);
   // this.error='An Error Occured';
    this.isLoading=false;
  });
  form.reset();
}
onHandleError(){
  this.error=null;
}
//dynamic component
private showErrorAlert(message:string){
const alertComponentFactory=this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
console.log("alertComponentFactory:  "+alertComponentFactory);
const alertHostConatinerRef= this.alertHost.viewContainerRef;
alertHostConatinerRef.clear();
const componentRef=alertHostConatinerRef.createComponent(alertComponentFactory);
console.log("componentRef: "+componentRef);
componentRef.instance.message=message;
this.closeSub=componentRef.instance.close.subscribe(()=>{
  this.closeSub.unsubscribe();
  alertHostConatinerRef.clear();
})




}
}
