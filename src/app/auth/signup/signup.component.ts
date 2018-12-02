import {Component, OnDestroy, OnInit} from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import {GlobalService} from "../../shared/global.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  public maxDate: Date;
  public isLoading = false;
  private loadingSubscription: Subscription;

  constructor(private authService: AuthService,
              private globalService: GlobalService) { }

  ngOnInit() {
    this.loadingSubscription = this.globalService.loadingStateChanged.subscribe((isLoading) => {
      this.isLoading = isLoading
    });
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  signup(form: NgForm):void {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

  ngOnDestroy() {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
