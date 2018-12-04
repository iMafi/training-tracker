import { Action } from "@ngrx/store";
import { UiActions, UI_START_LOADING, UI_STOP_LOADING } from "./ui.actions";

export interface IState {
  isLoading: boolean
}

const initialState: IState = {
  isLoading: false
};

export function uiReducer(state = initialState, action: Action) {
  switch(action.type) {
    case UI_START_LOADING: return {isLoading: true};
    case UI_STOP_LOADING: return {isLoading: false};
    default: return state;
  }
}

export const getIsLoading = (state) => state.isLoading;
