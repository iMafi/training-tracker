import { Action } from "@ngrx/store";

export const UI_START_LOADING = "UI_START_LOADING";
export const UI_STOP_LOADING = "UI_STOP_LOADING";

export class StartLoading implements Action {
  readonly type = UI_START_LOADING;
}

export class StopLoading  implements Action {
  readonly type = UI_STOP_LOADING;
}

export type UiActions = StartLoading | StopLoading;
