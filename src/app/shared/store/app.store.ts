import { ActionReducerMap } from "@ngrx/store";
import { Character, characterListReducer, characterReducer, CharacterState, totalCharacterReducer } from "@features/dragon-ball/store/characters";

export interface AppState {
  characters: CharacterState;
  totalCharacters: number,
  characterList: Readonly<Character[]>
}

export const APP_REDUCERS: ActionReducerMap<AppState> = {
  characters: characterReducer,
  totalCharacters: totalCharacterReducer,
  characterList: characterListReducer
}
