import { createReducer, on } from '@ngrx/store';
import { adapter, filterAdapter, initialCharacterListState, initialFilterState, initialState, initialTotalState } from './character.entity';
import {characterListAction, loadCharacters, loadCharactersError, loadCharactersFilter, loadCharactersFilterError, loadCharactersFilterSuccess, loadCharactersSuccess, totalCharacterAction } from './character.action';

export const characterReducer = createReducer(
  initialState,
  on(loadCharacters, (state, {page, limit}) => adapter.setAll(
    [], {...state, loading: true, error: null})
  ),
  on(loadCharactersSuccess, (state, {characters, meta, links}) =>
    adapter.setAll(characters, { ...state, loading: false, meta, links })
  ),
  on(loadCharactersError, (state, { error }) => ({
    ...state, loading: false, error
  })),
);

export const characterFilterReducer = createReducer(
  initialFilterState,
  on(loadCharactersFilter, (state) => filterAdapter.setAll([], {...state, loading: true})
  ),
  on(loadCharactersFilterSuccess, (state, {characters}) =>
    filterAdapter.setAll(characters, { ...state, loading: false })
  ),
  on(loadCharactersFilterError, (state, { error }) => ({
    ...state, loading: false, error
  })),
);

export const totalCharacterReducer = createReducer(
  initialTotalState,
  on(totalCharacterAction, (state, { total }) => (total))
)

export const characterListReducer = createReducer(
  initialCharacterListState,
  on(characterListAction, (state, {characters}) => {
    return [...state, ...characters]
  })
)


export const {
  selectAll: selectAllCharacters,
  selectEntities: selectCharacterEntities,
  selectIds: selectCharactersIds,
  selectTotal: selectCharactersTotal
} = adapter.getSelectors();

export const {
  selectAll: selectAllFilterCharacters,
  selectEntities: selectCharacterFilterEntities,
  selectIds: selectCharactersFilterIds,
  selectTotal: selectCharactersFilterTotal
} = filterAdapter.getSelectors();
