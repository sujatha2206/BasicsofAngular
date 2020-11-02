import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const modifiedReq=req.clone({
      headers:req.headers.append('Auth','xyz')
    })

  return next.handle(modifiedReq);//next is object that allow us to continue  its journey
  }

}
