

export class AuthService{
  //fake serice
  loggedIn=false;
  isAuthenticated(){
    const promise = new Promise(
      (resolve,reject)=>{
        setTimeout(
          ()=>{ resolve(this.loggedIn)
  },800);
}
    );
    return promise;
  }
  logIn(){
    this.loggedIn=true;
  }
  logOut(){
    this.loggedIn=false;
  }

}
