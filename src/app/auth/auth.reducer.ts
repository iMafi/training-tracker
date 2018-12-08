import { Action } from "@ngrx/store";
import { AuthActions, SET_UNAUTHENTICATED, SET_AUTHENTICATED } from "./auth.actions";

export interface IState {
  isAuthenticated: boolean
}

const initialState: IState = {
  isAuthenticated: false
};

export function authReducer(state = initialState, action: Action) {
  switch(action.type) {
    case SET_AUTHENTICATED: return {isAuthenticated: true};
    case SET_UNAUTHENTICATED: return {isAuthenticated: false};
    default: return state;
  }
}

export const getIsAuth = (state) => state.isAuthenticated;
