import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material";
import {MatSnackBarConfig} from "@angular/material/typings/esm5/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private snackBar: MatSnackBar) { }

  showSnackBar(message: string, action: string, config: MatSnackBarConfig): void {
    this.snackBar.open(message, action, config);
  }
}
