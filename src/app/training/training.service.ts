import { Injectable } from '@angular/core';
import { ITraining } from "./training.interface";
import { Subject } from "rxjs";

@Injectable()
export class TrainingService {
  private availableExercises: ITraining[] = [{ id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }];
  private activeExercise: ITraining;
  exerciseChanged = new Subject<ITraining>();
  private exercises: ITraining[] = [];

  constructor() { }

  getAvailableExercises(): ITraining[] {
    return this.availableExercises.slice();
  }

  startExercise(selectedId: string): void {
    this.activeExercise = this.availableExercises.find((ex) => {
      return ex.id === selectedId;
    });
    this.exerciseChanged.next({...this.activeExercise});
  }

  completeExercise(): void {
    this.exercises.push({...this.activeExercise, date: new Date(), state: 'completed'});
    this.activeExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number): void {
    this.exercises.push({
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

  getAllExercises(): ITraining[] {
    return this.exercises.slice();
  }
}
