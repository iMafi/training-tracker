import { Subject } from "rxjs";
import { Injectable } from '@angular/core';
import { IAuthData } from "./auth-data.interface";
import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { TrainingService } from "../training/training.service";
import { MatSnackBar } from "@angular/material";
import { GlobalService } from "../shared/global.service";
import { Store } from "@ngrx/store";
import * as appReducer from "../app.reducer";
import * as UI from "../shared/ui.actions";

@Injectable()

export class AuthService {
  public authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private trainingService: TrainingService,
              private snackBar: MatSnackBar,
              private globalService: GlobalService,
              private store: Store<appReducer.IState>) {
    this.initAuthListener();
  }

  initAuthListener(): void {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: IAuthData): void {
    // this.globalService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        // this.globalService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
      })
      .catch((err) => {
        // this.globalService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.globalService.showSnackBar(err.message, null, {
          duration: 3000
        });
      });
  }

  login(authData: IAuthData): void {
    // this.globalService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        // this.globalService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
      })
      .catch((err) => {
        // this.globalService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.globalService.showSnackBar(err.message, null, {
          duration: 3000
        });
      });
  }

  logout(): void {
    this.afAuth.auth.signOut();
  }

  isAuth(): boolean {
    return this.isAuthenticated;
  }
}
