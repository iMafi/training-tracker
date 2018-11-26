import { Component, OnInit } from '@angular/core';
import { TrainingService } from "../training.service";
import { ITraining } from "../training.interface";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  trainings: ITraining[] = [];

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.trainings = this.trainingService.getExercises();
  }

  startTraining(form: NgForm):void {
    this.trainingService.startExercise(form.value.training);
  }
}
