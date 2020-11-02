import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signUpForm:FormGroup;
  forbiddenUserName=['suji','suresh'];
ngOnInit(){
  this.signUpForm = new FormGroup({
    'userData':new FormGroup({
      'username': new FormControl(null,[Validators.required,this.forbiddenName.bind(this)]),
      'email':new FormControl(null,[Validators.required,Validators.email,this.forbiddenEmails]),
    }),

    'gender':new FormControl('male'),
    'hobbies':new FormArray([])
  });
  // this.signUpForm.valueChanges.subscribe((value)=>{
  //   console.log(value);
  // })
  // this.signUpForm.statusChanges.subscribe((status)=>{
  //   console.log(status);
  // });
  this.signUpForm.setValue({
    'userData':{
      'username':'suji',
     'email':''
    },
    'gender':'female',
    'hobbies':[]
  });
  this.signUpForm.patchValue({
    'userData':{
      'username':'suresh',
      'email':''
    },
    'gender':'male'
  })
}
onSubmit(){
  console.log(this.signUpForm);
this.signUpForm.reset();
}
onAddHobby(){
  const control = new FormControl(null,Validators.required);
  (<FormArray>this.signUpForm.get('hobbies')).push(control);

}
getControls(){
 return (<FormArray>this.signUpForm.get('hobbies')).controls;
}
forbiddenName(control:FormControl):{[s:string]:boolean}{
  //console.log("value"+control.value);
  //console.log("name"+this.forbiddenUserName.indexOf(control.value))
  if(this.forbiddenUserName.indexOf(control.value) !== -1){
    return {'nameisforbidden':true};
  }
  return null;

}
forbiddenEmails(control:FormControl):Promise<any> |Observable<any>{
  console.log("value"+control.value);

  const promise = new Promise<any>((resolve,reject)=>{
    setTimeout(()=>{
      console.log("value2 "+control.value);
      console.log("test:  "+control.value == 'test@test.com');
      if(control.value === "test@gmail.com"){
        resolve({'emailIsForbidden':true});
      }
      else{
        resolve(null);
      }
    },1000)

  });
  return promise;
}
}
