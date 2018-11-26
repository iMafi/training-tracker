import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { TrainingService } from "./training.service";

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  isTrainingOngoing = false;
  private trainingSubscription: Subscription;
  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.trainingSubscription = this.trainingService.exerciseChanged.subscribe((ex) => {
      this.isTrainingOngoing = ex ? true : false;
    });
  }

}
