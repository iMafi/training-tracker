import * as uiReducer from "./shared/ui.reducer";
import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";

export interface IState {
  ui: uiReducer.IState
}

export const reducers: ActionReducerMap<IState> = {
  ui: uiReducer.uiReducer
};

export const getUiState = createFeatureSelector<uiReducer.IState>('ui');
export const getIsLoading = createSelector(getUiState, uiReducer.getIsLoading);
