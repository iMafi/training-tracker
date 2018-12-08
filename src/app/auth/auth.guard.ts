import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";
import { take } from "rxjs/operators";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route} from '@angular/router';
import * as appReducer from "../app.reducer";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private store: Store<appReducer.IState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(appReducer.getIsAuth).pipe(take(1));
  }

  canLoad(route: Route) {
    return this.store.select(appReducer.getIsAuth).pipe(take(1));
  }
}
