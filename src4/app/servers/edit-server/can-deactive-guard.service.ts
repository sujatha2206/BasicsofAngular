import { Observable } from 'rxjs';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export interface canComponentDeactivate{
  canDeactivate : () => Observable<boolean> | Promise<boolean> | boolean;
}
export class CanDeactivateGuard implements CanDeactivate<canComponentDeactivate>{
  canDeactivate(component: canComponentDeactivate, currentRoute:ActivatedRouteSnapshot, currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot):
   boolean |  Observable<boolean> |  Promise<boolean> {

    return component.canDeactivate();
  }

}
