import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersComponent } from './servers/servers.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactive-guard.service';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { ServerResolver } from './servers/server/server-resolver.service';


const appRoute:Routes=[
  {path:'',redirectTo:'/home',pathMatch:'full'},//if we  use prefix every route will load home
  {path:'home',component:HomeComponent},
  {path:'users',component:UsersComponent,children:[
    {path:':id/:name',component:UserComponent}
  ]},
  {path:'servers',
   // canActivate:[AuthGuard],
   canActivateChild:[AuthGuard],
    component:ServersComponent,
      children: [
    {path:':id',component:ServerComponent,resolve:{server:ServerResolver}},
    {path:':id/edit',component:EditServerComponent,canDeactivate:[CanDeactivateGuard]},
  ]},
  //{path:'not-found',component:PageNotFoundComponent},
  {path:'not-found',component:ErrorMessageComponent,data:{'message':'page not found'}},

{path:'**',redirectTo:'/not-found'}

];
@NgModule({

  imports: [
    //RouterModule.forRoot(appRoute,{useHash:true}),
   RouterModule.forRoot(appRoute),

  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
