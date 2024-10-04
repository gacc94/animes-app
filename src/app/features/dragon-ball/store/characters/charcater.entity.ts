import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Links, Meta } from "../../interfaces/response.interface";
import { Character } from "./charcater.model";

export const characterKey: 'character' = 'character';

export interface CharacterState extends EntityState<Character> {
  loading: boolean;
  error: string | null;
  meta: Meta | null;
  links: Links | null;
}

export const adapter: EntityAdapter<Character> = createEntityAdapter<Character>({
  selectId: (character: Character) => character.id,
  sortComparer: false
});

export const initialState: CharacterState = adapter.getInitialState({
  loading: false,
  error: null,
  meta: null,
  links: null,
});
