import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  loadedPosts:post[] = [];
  isFetching = false;
  error=null;
  errorUnsub:Subscription;
  constructor(private postService:PostsService){}

  ngOnInit() {
   this.errorUnsub= this.postService.error.subscribe(errorMessage=>{
      this.error=errorMessage;
    })
    this.isFetching=true;

    this.postService.fetchPosts().subscribe(posts=>{
     this.isFetching = false;
      this.loadedPosts = posts;
      //console.log(posts);
     },error=>{
       this.isFetching=false;
      this.error=error.message;
      console.log(error);

     });;
  }

  onCreatePost(postData: post) {
    // Send Http request
    this.postService.createAndStorePosts(postData.title,postData.content);


  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(posts=>{
        this.isFetching = false;
        this.loadedPosts = posts;
      // console.log(posts);
     },error=>{
       this.isFetching=false;
      this.error=error.message;
     // console.log(error);

     });;
  }

  onClearPosts() {
    // Send Http request
    this.postService.clearPosts().subscribe(()=>{
      this.loadedPosts=[];
    });
  }
ngOnDestroy(){
  this.errorUnsub.unsubscribe();
}
onHandleError(){
  this.error=null;
}
}
