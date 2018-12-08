import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from "../../auth/auth.service";
import { Store } from "@ngrx/store";
import * as appReducer from "../../app.reducer";
import { Observable } from "rxjs";

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor(private authService: AuthService,
              private store: Store<appReducer.IState>) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(appReducer.getIsAuth);
  }

  onSidenavClose():void {
    this.sidenavClose.emit();
    this.authService.logout();
  }
}
