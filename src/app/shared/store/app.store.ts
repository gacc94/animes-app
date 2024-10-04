import { ActionReducerMap } from "@ngrx/store";
import { characterReducer, CharacterState } from "../../features/dragon-ball/store/characters";

export interface AppState {
  characters: CharacterState;
}

export const APP_REDUCERS: ActionReducerMap<AppState> = {
  characters: characterReducer
}
