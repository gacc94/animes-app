import { createReducer, on } from '@ngrx/store';
import { adapter, initialCharacterListState, initialState, initialTotalState } from './character.entity';
import {characterListAction, loadCharacters, loadCharactersError, loadCharactersSuccess, totalCharacterAction } from './character.action';
import { state } from '@angular/animations';
import { Character } from './charcater.model';

export const characterReducer = createReducer(
  initialState,
  on(loadCharacters, (state) => adapter.setAll(
    [], {...state, loading: true, error: null})
  ),
  on(loadCharactersSuccess, (state, {characters, meta, links}) =>
    adapter.setMany(characters, { ...state, loading: false, meta, links })
  ),
  on(loadCharactersError, (state, { error }) => ({
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
