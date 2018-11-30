import { Injectable } from '@angular/core';
import { ITraining } from "./training.interface";
import {Subject, Subscription} from "rxjs";
import {map} from "rxjs/operators";
import * as firebase from "firebase";
import { AngularFirestore } from "angularfire2/firestore";

@Injectable()
export class TrainingService {
  private availableExercises: ITraining[] = [];
  private activeExercise: ITraining;
  private firebaseSubscriptions: Subscription[] = [];
  exerciseChanged = new Subject<ITraining>();
  trainingsChanged = new Subject<ITraining[]>();
  finishedTrainingsChanged = new Subject<ITraining[]>();

  constructor(private firestore: AngularFirestore) { }

  getAvailableExercises(): void {
    this.firebaseSubscriptions.push(this.firestore
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
        })).subscribe((trainings: ITraining[]) => {
          this.availableExercises = trainings;
          this.trainingsChanged.next([...this.availableExercises]);
        }));
  }

  startExercise(selectedId: string): void {
    this.activeExercise = this.availableExercises.find((ex) => {
      return ex.id === selectedId;
    });
    this.exerciseChanged.next({...this.activeExercise});
  }

  completeExercise(): void {
    this.saveExercise({...this.activeExercise, date: new Date(), state: 'completed'});
    this.activeExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number): void {
    this.saveExercise({
      ...this.activeExercise,
      date: new Date(),
      state: 'cancelled',
      duration: this.activeExercise.duration * (progress / 100),
      calories: this.activeExercise.calories * (progress / 100)
    });
    this.activeExercise = null;
    this.exerciseChanged.next(null);
  }

  getActiveExercise(): ITraining {
    return {...this.activeExercise};
  }

  getAllExercises(): void {
    this.firebaseSubscriptions.push(
      this.firestore.collection("finishedTrainings")
      .valueChanges()
      .subscribe((trainings: ITraining[]) => {
        this.finishedTrainingsChanged.next(trainings);
      })
    );
  }

  private saveExercise(exercise: ITraining): void {
    this.firestore.collection("finishedTrainings").add(exercise);
  }

  cancelSubscriptions(): void {
    this.firebaseSubscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
