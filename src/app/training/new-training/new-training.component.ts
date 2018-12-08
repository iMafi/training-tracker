import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from "../training.service";
import { ITraining } from "../training.interface";
import { GlobalService } from "../../shared/global.service";
import * as trainingReducer from "../training.reducer";
import * as appReducer from "../../app.reducer";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  public trainings$: Observable<ITraining[]>;
  public isLoading$: Observable<boolean>;
  constructor(private trainingService: TrainingService,
              private globalService: GlobalService,
              private store: Store<trainingReducer.IState>) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(appReducer.getIsLoading);
    this.trainings$ = this.store.select(trainingReducer.getAvailableTrainings);
    this.getTrainings();
  }

  getTrainings(): void {
    this.trainingService.getAvailableExercises();
  }

  startTraining(form: NgForm):void {
    this.trainingService.startExercise(form.value.training);
  }
}
