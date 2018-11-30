import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from "../training.service";
import { ITraining } from "../training.interface";
import { NgForm } from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  trainings: ITraining[] = [];
  trainingSubscription: Subscription;
  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.trainingSubscription = this.trainingService.trainingsChanged.subscribe((trainings) => {
      this.trainings = trainings;
    });
    this.trainingService.getAvailableExercises();
  }

  startTraining(form: NgForm):void {
    this.trainingService.startExercise(form.value.training);
  }

  ngOnDestroy() {
    this.trainingSubscription.unsubscribe();
  }
}
