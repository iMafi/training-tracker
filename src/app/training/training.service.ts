import { Injectable } from '@angular/core';
import { ITraining } from "./training.interface";
import { Subscription } from "rxjs";
import { map, take } from "rxjs/operators";
import { AngularFirestore } from "angularfire2/firestore";
import { GlobalService } from "../shared/global.service";
import * as uiActions from "../shared/ui.actions";
import * as trainingActions from "./training.actions";
import * as trainingReducer from "./training.reducer";
import { Store } from "@ngrx/store";

@Injectable()
export class TrainingService {
  private firebaseSubscriptions: Subscription[] = [];

  constructor(private firestore: AngularFirestore,
              private globalService: GlobalService,
              private store: Store<trainingReducer.IState>) { }

  getAvailableExercises(): void {
    this.store.dispatch(new uiActions.StartLoading());
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
          this.store.dispatch(new uiActions.StopLoading());
          this.store.dispatch(new trainingActions.SetAvailableTrainings(trainings));
        }, (err) => {
          this.store.dispatch(new uiActions.StopLoading());
          this.globalService.showSnackBar("Getting trainings failed. Please try again later", null, {
            duration: 3000
          });
      }));
  }

  startExercise(selectedId: string): void {
    this.store.dispatch(new trainingActions.StartTraining(selectedId));
  }

  completeExercise(): void {
    this.store.select(trainingReducer.getActiveTraining)
      .pipe(take(1))
      .subscribe((training: ITraining) => {
        this.saveExercise({...training, date: new Date(), state: 'completed'});
        this.store.dispatch(new trainingActions.StopTraining());
      });
  }

  cancelExercise(progress: number): void {
    this.store.select(trainingReducer.getActiveTraining)
      .pipe(take(1))
      .subscribe((training: ITraining) => {
        this.saveExercise({
          ...training,
          date: new Date(),
          state: 'cancelled',
          duration: training.duration * (progress / 100),
          calories: training.calories * (progress / 100)
        });
        this.store.dispatch(new trainingActions.StopTraining());
      });
  }

  getAllExercises(): void {
    this.firebaseSubscriptions.push(
      this.firestore.collection("finishedTrainings")
      .valueChanges()
      .subscribe((trainings: ITraining[]) => {
        this.store.dispatch(new trainingActions.SetFinishedTrainings(trainings));
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
