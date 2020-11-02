import { Directive,Renderer2, OnInit, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor:String ='transparent';
  @Input() highlightColor:String ='blue';
 @HostBinding('style.backgroundColor') backgroundColor:String ;
  constructor(private elRef:ElementRef,private renderer:Renderer2) { }
  ngOnInit(){
    this.backgroundColor =this.defaultColor;
    //this.renderer.setStyle(this.elRef.nativeElement,"backgroundColor","blue");
  }

  @HostListener('mouseenter') mouseover(){
    //this.renderer.setStyle(this.elRef.nativeElement,"backgroundColor","blue");
    this.backgroundColor = this.highlightColor;
  }
  @HostListener('mouseleave') mouseleave(){
    //this.renderer.setStyle(this.elRef.nativeElement,"backgroundColor","transparent");
    this.backgroundColor=this.defaultColor;
  }

}
