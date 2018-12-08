import { Action } from "@ngrx/store";
import { ITraining } from "./training.interface";

export const SET_AVAILABLE_TRAININGS = "TRAINING_SET_AVAILABLE";
export const SET_FINISHED_TRAININGS = "TRAINING_SET_FINISHED";
export const START_TRAINING = "TRAINING_START";
export const STOP_TRAINING = "TRAINING_STOP";

export class SetAvailableTrainings implements Action {
  readonly type = SET_AVAILABLE_TRAININGS;

  constructor(public payload: ITraining[]) {}
}

export class SetFinishedTrainings implements Action {
  readonly type = SET_FINISHED_TRAININGS;

  constructor(public payload: ITraining[]) {}
}

export class StartTraining implements Action {
  readonly type = START_TRAINING;

  constructor(public payload: string) {}
}

export class StopTraining implements Action {
  readonly type = STOP_TRAINING;
}

export type TrainingActions = SetAvailableTrainings | SetFinishedTrainings | StartTraining | StopTraining;
