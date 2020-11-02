import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') signUpForm:NgForm;
  defaultQuestion="teacher";
  genders=["male","female"];
  answer="";
  user={
    username:'',
    email:'',
    secret:'',
    questionAnswer:'',
    gender:''
  }
submitted=false;
  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.signUpForm.setValue({
    // userData:{
    //   username:suggestedName,
    //   email:''
    // },
    // secret:'pet',
    // questionAnswer:'',
    // gender:'male'
    // });
    this.signUpForm.form.patchValue({
      userData:{
        username:suggestedName,
        email:''
      }
    })
  }
  // onSubmit(form:NgForm){
  //   console.log(form);
  // }
  onSubmit(){
  this.submitted=true;
  this.user.username = this.signUpForm.value.userData.username;
  this.user.email=this.signUpForm.value.userData.email;
  this.user.secret = this.signUpForm.value.secret;
  this.user.questionAnswer = this.signUpForm.value.questionAnswer;
  this.user.gender = this.signUpForm.value.gender;
  this.signUpForm.reset();



  }
}
