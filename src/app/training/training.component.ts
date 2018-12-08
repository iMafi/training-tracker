import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { TrainingService } from "./training.service";
import { Store } from "@ngrx/store";
import * as trainingReducer from "training.reducer";

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  isTrainingOngoing$: Observable<boolean>;

  constructor(private trainingService: TrainingService,
              private store: Store<trainingReducer.IState>) { }

  ngOnInit() {
    this.isTrainingOngoing$ = this.store.select(trainingReducer.getIsTraining);
  }
}
