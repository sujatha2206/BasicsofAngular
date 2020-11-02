import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { ServersService } from '../servers.service';


@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};


  constructor(private serversService: ServersService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
  // this.server = this.serversService.getServer(1);
  //   this.route.params.subscribe(
  //   (params:Params)=>{this.id = params['id']}
  // )
//   const id= +this.route.snapshot.params['id'];
//  // console.log(this.id);
//   this.server = this.serversService.getServer(id);
//   this.route.params.subscribe(
//       (params:Params)=>{this.server =this.serversService.getServer(+params['id']);}
//      );
//we are commenting will get data froim resolver

this.route.data.subscribe(
  (data:Data)=>{
    this.server=data['server'];
  }
)

  }
  onEdit(){
    this.router.navigate(['edit'],{relativeTo:this.route,queryParamsHandling:'preserve'},);//if we are using relative route specify which current route added to relatively
  }
}
