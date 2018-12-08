import {Action, createFeatureSelector, createSelector} from "@ngrx/store";
import {
  TrainingActions,
  SET_FINISHED_TRAININGS,
  SET_AVAILABLE_TRAININGS,
  START_TRAINING,
  STOP_TRAINING } from "./training.actions";
import { ITraining } from "./training.interface";
import * as appReducer from "../app.reducer";

export interface ITrainingState {
  availableTrainings: ITraining[],
  finishedTrainings: ITraining[],
  activeTraining: ITraining
}

export interface IState extends appReducer.IState {
  training: ITrainingState
}

const initialState: ITrainingState = {
  availableTrainings: [],
  finishedTrainings: [],
  activeTraining: null
};

export function trainingReducer(state = initialState, action: TrainingActions) {
  switch(action.type) {
    case SET_AVAILABLE_TRAININGS: return {
      ...state,
      availableTrainings: action.payload
    };
    case SET_FINISHED_TRAININGS: return {
      ...state,
      finishedTrainings: action.payload
    };
    case START_TRAINING: return {
      ...state,
      activeTraining: {...state.availableTrainings.find(training => training.id === action.payload)}
    };
    case STOP_TRAINING: return {
      ...state,
      activeTraining: null
    };
    default: return state;
  }
}

export const getTrainingState = createFeatureSelector<ITrainingState>('training');

export const getAvailableTrainings = createSelector(getTrainingState, (state: ITrainingState) => state.availableTrainings);
export const getFinishedTrainings = createSelector(getTrainingState, (state: ITrainingState) => state.finishedTrainings);
export const getActiveTraining = createSelector(getTrainingState,(state: ITrainingState) => state.activeTraining);
export const getIsTraining = createSelector(getTrainingState, (state: ITrainingState) => state.activeTraining != null);

