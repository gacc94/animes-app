import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Links, Meta } from "../../interfaces/response.interface";
import { Character } from "./charcater.model";

export const characterKey: 'character' = 'character';

/**
 * * **********************  STATES INTERFACES  ************************
 */
export interface CharacterState extends EntityState<Character> {
  loading: boolean;
  error: string | null;
  meta: Meta | null;
  links: Links | null;
}

export interface CharacterFilterState extends EntityState<Character> {
  loading: boolean;
  error: string | null;
}

/**
 * * *************************** ADAPTERS  *****************************
 */
export const adapter: EntityAdapter<Character> = createEntityAdapter<Character>({
  selectId: (character: Character) => character.id,
  sortComparer: false
});

export const filterAdapter: EntityAdapter<Character> = createEntityAdapter<Character>({
  selectId: (character: Character) => character.id,
  sortComparer: false
});

/**
 * * **************************  INITIAL STATE  **************************
 */
export const initialState: CharacterState = adapter.getInitialState({
  loading: false,
  error: null,
  meta: null,
  links: null,
});

export const initialFilterState: CharacterFilterState = filterAdapter.getInitialState({
  error: null,
  loading: false,
})

export const initialTotalState: number = 0

export const initialCharacterListState: Readonly<Character[]> = []
