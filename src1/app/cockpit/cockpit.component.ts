import { Component, OnInit ,EventEmitter, Output, ViewChild, ElementRef} from '@angular/core';


@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
 @Output() serverCreated= new EventEmitter<{serverName:string,serverContent:string}>();
 @Output('bpCreated') bluePrintCreated= new EventEmitter<{serverName:string,serverContent:string}>();
 @ViewChild('serverContentInput') serverContentInput:ElementRef;

  //newServerName = '';
  newServerContent = '';
  constructor() { }

  ngOnInit(): void {
  }
  onAddServer(nameInput:HTMLInputElement) {
   // console.log("nameInput "+nameInput);
   // console.log("serverContentInput "+this.serverContentInput);
   this.serverCreated.emit({serverName:nameInput.value,serverContent:this.serverContentInput.nativeElement.value});
  }

  onAddBlueprint(nameInput:HTMLInputElement) {
  //  console.log("nameinput"+nameInput);
  //this.serverContentInput.nativeElement.value ='something';//not best practise to change dom using viewchild
   this.bluePrintCreated.emit({serverName:nameInput.value,serverContent:this.serverContentInput.nativeElement.value});
  }

}
