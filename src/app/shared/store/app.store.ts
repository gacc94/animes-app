import { ActionReducerMap } from "@ngrx/store";
import { characterReducer, CharacterState, totalCharacterReducer } from "@features/dragon-ball/store/characters";

export interface AppState {
  characters: CharacterState;
  totalCharacters: number,
}

export const APP_REDUCERS: ActionReducerMap<AppState> = {
  characters: characterReducer,
  totalCharacters: totalCharacterReducer
}
