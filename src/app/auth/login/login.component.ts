import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { GlobalService } from "../../shared/global.service";
import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { Store } from "@ngrx/store";
import * as appReducer from "../../app.reducer";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public isLoading$: Observable<boolean>;
  private loadingSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private globalService: GlobalService,
              private store: Store<appReducer.IState>) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(appReducer.getIsLoading);
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    this.authService.login({
      email: this.loginForm.value.login,
      password: this.loginForm.value.password
    });
  }

  ngOnDestroy() {
    // if (this.loadingSubscription) {
    //   this.loadingSubscription.unsubscribe();
    // }
  }
}
