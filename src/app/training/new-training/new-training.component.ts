import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from "../training.service";
import { ITraining } from "../training.interface";
import { NgForm } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import {GlobalService} from "../../shared/global.service";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  public trainings: ITraining[] = [];
  private trainingSubscription: Subscription;
  private loadingTrainingsSubscription: Subscription;
  public isLoading = true;
  constructor(private trainingService: TrainingService,
              private globalService: GlobalService) { }

  ngOnInit() {
    this.loadingTrainingsSubscription = this.globalService.trainingLoadingStateChanged.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
    this.trainingSubscription = this.trainingService.trainingsChanged.subscribe((trainings) => {
      this.trainings = trainings;
    });
    this.getTrainings();
  }

  getTrainings(): void {
    this.trainingService.getAvailableExercises();
  }

  startTraining(form: NgForm):void {
    this.trainingService.startExercise(form.value.training);
  }

  ngOnDestroy() {
    if (this.trainingSubscription) {
      this.trainingSubscription.unsubscribe();
    }

    if (this.loadingTrainingsSubscription) {
      this.loadingTrainingsSubscription.unsubscribe();
    }
  }
}
