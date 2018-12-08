import {Component, OnInit} from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import {GlobalService} from "../../shared/global.service";
import {Observable, Subscription} from "rxjs";
import * as appReducer from "../../app.reducer";
import { Store } from "@ngrx/store";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public maxDate: Date;
  public isLoading$: Observable<boolean>;

  constructor(private authService: AuthService,
              private globalService: GlobalService,
              private store: Store<appReducer.IState>) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(appReducer.getIsLoading);
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  signup(form: NgForm):void {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }
}
