import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class LoggingInterceptorSerice implements HttpInterceptor{

  intercept(req:HttpRequest<any>,next:HttpHandler){
    console.log("outgoing request");
    console.log(req.url);
    console.log(req.headers);//because here logging interceptor second order so we shluld see header 
    return next.handle(req).pipe(tap(event=>{
      if(event.type === HttpEventType.Response){
        console.log("incoming response");
        console.log(event.body);

      }
    }));
   }
}
