import { createReducer, on } from '@ngrx/store';
import { adapter, initialState } from './charcater.entity';
import { loadCharacters, loadCharactersError, loadCharactersSuccess } from './character.action';

export const characterReducer = createReducer(
  initialState,
  on(loadCharacters, (state) => adapter.setAll(
    [], {...state, loading: true, error: null})
  ),
  on(loadCharactersSuccess, (state, {characters, meta, links}) =>
    adapter.setAll(characters, { ...state, loading: false, meta, links })
  ),
  on(loadCharactersError, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

export const {
  selectAll: selectAllCharacters,
  selectEntities: selectCharacterEntities,
  selectIds: selectCharactersIds,
  selectTotal: selectCharactersTotal
} = adapter.getSelectors();
