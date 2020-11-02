import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //title = 'BasicsofAngular';

  serverElements = [{type:'server',name:'test server',content:'test server'}];


  onServerAdded(serverData:{serverName:string,serverContent:string}) {
    this.serverElements.push({
      type:'server',
      name:serverData.serverName,
      content:serverData.serverContent
    });

    }

    onBlueprintAdded(bluePrintData:{serverName:string,serverContent:string}) {
      this.serverElements.push({
        type:'server',
        name:bluePrintData.serverName,
        content:bluePrintData.serverContent
      });
    }
    onChangeFirst(){
      this.serverElements[0].name="changed";
    }
    onDestroyFirst(){
      this.serverElements.splice(0,1);
    }

}
