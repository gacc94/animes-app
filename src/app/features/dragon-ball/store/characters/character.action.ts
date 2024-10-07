import { createAction, createActionGroup, props } from "@ngrx/store";
import { Character } from "./charcater.model";
import { Links, Meta } from "../../interfaces/response.interface";
import { characterKey } from "./character.entity";

const characterActions = createActionGroup({
  source: 'characters',
  events: {
    'Load Characters': props<{ page: number; limit: number }>(),
    'Load Characters Success': props<{ characters: Character[], meta: Meta, links: Links }>(),
    'Load Characters Error': props<{ error: string }>(),
  }
});

const characterFilterActions = createActionGroup({
  source: 'characterFilter',
  events: {
    'Load Characters Filter': props<{ name: string; race: string }>(),
    'Load Characters Filter Success': props<{ characters: Character[] }>(),
    'Load Characters Filter Error': props<{ error: string }>(),
  }
});

export const totalCharacterAction = createAction(
  'Total Character Action',
  props<{total: number}>()
);

export const characterListAction = createAction(
  'Character List Action',
  props<{characters: Character[]}>()
);

export const { loadCharacters, loadCharactersSuccess, loadCharactersError } = characterActions
export const { loadCharactersFilter, loadCharactersFilterSuccess, loadCharactersFilterError } = characterFilterActions
