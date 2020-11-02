
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
selector:'[appUnless]'
})
export class UnlessDirective{
  @Input() set appUnless(condition:boolean){
    if(!condition){
      this.vcRef.createEmbeddedView(this.templateRef);

    }else{

      this.vcRef.clear();
    }

  }
  //this now turens method //this still setter of property

  constructor(private templateRef:TemplateRef<any>,private vcRef:ViewContainerRef){

  }
}
