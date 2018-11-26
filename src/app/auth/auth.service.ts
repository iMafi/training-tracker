import { Subject } from "rxjs";
import { Injectable } from '@angular/core';
import { IUser } from "./user.interface";
import { IAuthData } from "./auth-data.interface";
import { Router } from "@angular/router";

@Injectable()

export class AuthService {
  public authChange = new Subject<boolean>();
  private user: IUser;
  constructor(private router: Router) { }

  registerUser(authData: IAuthData): void {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    };
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

  login(authData: IAuthData): void {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    };
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

  logout(): void {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser(): IUser {
    return {...this.user};
  }

  isAuth(): boolean {
    return this.user != null;
  }
}
