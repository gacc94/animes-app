import { createReducer, on } from '@ngrx/store';
import { adapter, initialState } from './character.entity';
import { loadCharacters, loadCharactersError, loadCharactersSuccess, totalCharacterAction } from './character.action';
import { state } from '@angular/animations';

export const characterReducer = createReducer(
  initialState,
  on(loadCharacters, (state) => adapter.setAll(
    [], {...state, loading: true, error: null})
  ),
  on(loadCharactersSuccess, (state, {characters, meta, links}) =>
    adapter.setAll(characters, { ...state, loading: false, meta, links })
  ),
  on(loadCharactersError, (state, { error }) => ({
    ...state, loading: false, error
  })),
);

const initialTotalState: number = 0

export const totalCharacterReducer = createReducer(
  initialTotalState,
  on(totalCharacterAction, (state, { total }) => (total))
)

export const {
  selectAll: selectAllCharacters,
  selectEntities: selectCharacterEntities,
  selectIds: selectCharactersIds,
  selectTotal: selectCharactersTotal
} = adapter.getSelectors();
