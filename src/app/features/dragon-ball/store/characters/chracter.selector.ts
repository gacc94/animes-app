import { createFeature, createFeatureSelector, createSelector } from '@ngrx/store';
import { characterReducer, selectAllCharacters } from './chracter.reducer';
import { adapter, characterKey, CharacterState } from './character.entity';

export const characterFeature = createFeature({
  name: 'characters',
  reducer: characterReducer,
  extraSelectors: ({selectCharactersState}) => ({
    ...adapter.getSelectors(selectCharactersState)
  })
});

export const characterSelectFeature = createFeatureSelector<CharacterState>('characters')

export const totalCharacterSelectFeature = createFeatureSelector<number>('totalCharacters');

export const selectCharacters = createSelector(
  characterSelectFeature,
  selectAllCharacters
)

export const selectLoaging = createSelector(
  characterSelectFeature,
  (state) => state.loading,
)

export const selectMeta = createSelector(
  characterSelectFeature,
  (state) => state.meta,
)

export const selectTotalCharacters = createSelector(
  totalCharacterSelectFeature,
  (state) => state
)