import { Component, OnInit } from '@angular/core';
import { TrainingService } from "../training.service";
import { ITraining } from "../training.interface";
import { NgForm } from "@angular/forms";
import { AngularFirestore } from "angularfire2/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  // trainings: ITraining[] = [];
  trainings: Observable<ITraining[]>;
  constructor(private trainingService: TrainingService,
              private firestore: AngularFirestore) { }

  ngOnInit() {
    this.trainings = this.firestore
      .collection("availableExercises")
      .snapshotChanges()
      .pipe(
      map(data => {
        return data.map(doc => {
          return {
            id: doc.payload.doc.id,
            name: doc.payload.doc.data()["name"],
            duration: doc.payload.doc.data()["duration"],
            calories: doc.payload.doc.data()["calories"]
          }
        });
      }));
  }

  startTraining(form: NgForm):void {
    this.trainingService.startExercise(form.value.training);
  }
}
