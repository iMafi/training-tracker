import { Subject } from "rxjs";
import { Injectable } from '@angular/core';
import { IUser } from "./user.interface";
import { IAuthData } from "./auth-data.interface";
import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { TrainingService } from "../training/training.service";

@Injectable()

export class AuthService {
  public authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private trainingService: TrainingService) {
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
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
      })
      .catch((err) => {
      });
  }

  login(authData: IAuthData): void {
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
      })
      .catch((err) => {
      });
  }

  logout(): void {
    this.afAuth.auth.signOut();
  }

  isAuth(): boolean {
    return this.isAuthenticated;
  }
}
