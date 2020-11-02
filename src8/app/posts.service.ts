import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpEventType } from '@angular/common/http';
import { post } from './post.model';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class PostsService{
error= new Subject<String>();
constructor(private http:HttpClient){

}
createAndStorePosts(title:string,content:string){
  const postData:post={title:title,content:content}

  this.http
  .post(
    'https://ng-complete-guide-e90d9.firebaseio.com/posts.json',
    postData,{
      observe:'response'
    }
  )
  .subscribe(responseData => {
    console.log(responseData.body);
  },error=>{
    this.error.next(error.message);

  },);
}
fetchPosts(){
 // this.isFetching=true;
 let searchParams= new HttpParams();
 searchParams= searchParams.append("print","pretty");
 searchParams = searchParams.append("custom","key")
 return  this.http.get<{[key:string]:post}>('https://ng-complete-guide-e90d9.firebaseio.com/posts.json',{
   headers: new HttpHeaders({'custom-header':'hello'}),
   params:searchParams
 }).pipe(map((repsonseData )=>{
     const postArray:post[]=[];
     for(const key in repsonseData){ //checking u are accsaessing key,so to avoid accsessing prototype of
       if(repsonseData.hasOwnProperty(key)){
      postArray.push({...repsonseData[key], id:key});
       }
     }
     return postArray;
    }),catchError(errorRes=>{
      //send to anlaytics server
      return throwError(errorRes);

    }));

}
clearPosts(){
  //if we want to return to component use return and subscribe in component
  return this.http.delete('https://ng-complete-guide-e90d9.firebaseio.com/posts.json',
  {observe:'events',
    responseType:'json'
              }).pipe(tap(event=>{
    console.log(event);
    if(event.type === HttpEventType.Sent){
      //update in ui ,inform user request sent successful waiting for response

    }
    if(event.type === HttpEventType.Response){
      //check did i got response
      console.log(event.body);
    }

  }));

}
}
