import { pipe } from 'rxjs';
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name:'shorten'
})
export class ShortenPipe implements PipeTransform{
  transform(value: any,limit:number) {

    if(value.length >limit){
      const n=value.split(" ");
      const lastword=n[n.length-1];
    return value.substr(0,limit)+'...'+lastword;
    }
    return value;
  }

}
