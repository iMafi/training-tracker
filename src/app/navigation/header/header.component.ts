import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import * as appReducer from "../../app.reducer";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor(private store: Store<appReducer.IState>,
              private authService: AuthService) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(appReducer.getIsAuth);
  }

  toggleSideNav():void {
    this.sidenavToggle.emit();
  }

  logout(): void {
    this.authService.logout();
  }
}
