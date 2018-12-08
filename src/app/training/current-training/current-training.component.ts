import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material";
import { Store } from "@ngrx/store";

import { StopTrainingComponent } from "../stop-training/stop-training.component";
import { TrainingService } from "../training.service";
import * as trainingReducer from "../training.reducer";
import {ITraining} from "../training.interface";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  private interval;
  constructor(private dialog: MatDialog,
              private trainingService: TrainingService,
              private store: Store<trainingReducer.IState>) { }

  ngOnInit() {
    this.launchTimer();
  }

  stopTraining(): void {
    clearInterval(this.interval);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe( (isStopped:boolean) => {
      if (isStopped) {
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.launchTimer();
      }
    });
  }

  launchTimer(): void {
    this.store.select(trainingReducer.getActiveTraining)
      .pipe(take(1))
      .subscribe((training: ITraining) => {
        const step = training.duration / 100 * 1000;
        this.interval = setInterval(() => {
          this.progress++;
          if (this.progress >= 100) {
            this.trainingService.completeExercise();
            clearInterval(this.interval);
          }
        }, step);
      });
  }
}
