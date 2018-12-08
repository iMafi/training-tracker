import * as uiReducer from "./shared/ui.reducer";
import * as authReducer from "./auth/auth.reducer";
import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";

export interface IState {
  ui: uiReducer.IState,
  auth: authReducer.IState
}

export const reducers: ActionReducerMap<IState> = {
  ui: uiReducer.uiReducer,
  auth: authReducer.authReducer
};

export const getUiState = createFeatureSelector<uiReducer.IState>('ui');
export const getIsLoading = createSelector(getUiState, uiReducer.getIsLoading);

export const getAuthState = createFeatureSelector<authReducer.IState>('auth');
export const getIsAuth = createSelector(getAuthState, authReducer.getIsAuth);
