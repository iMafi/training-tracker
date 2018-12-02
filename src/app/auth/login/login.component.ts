import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { GlobalService } from "../../shared/global.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public isLoading = false;
  private loadingSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private globalService: GlobalService) { }

  ngOnInit() {
    this.loadingSubscription = this.globalService.loadingStateChanged.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
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
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
