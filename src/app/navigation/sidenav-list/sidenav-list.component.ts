import {Component, EventEmitter, OnInit, Output, OnDestroy} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() sidenavClose = new EventEmitter<void>();
  isAuth: boolean;
  authSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  onSidenavClose():void {
    this.sidenavClose.emit();
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
