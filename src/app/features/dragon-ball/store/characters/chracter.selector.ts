import { createFeature, createFeatureSelector, createSelector } from '@ngrx/store';
import { characterReducer, selectAllCharacters, selectAllFilterCharacters } from './chracter.reducer';
import { adapter, CharacterFilterState, characterKey, CharacterState } from './character.entity';
import { Character } from './charcater.model';

export const characterFeature = createFeature({
  name: 'characters',
  reducer: characterReducer,
  extraSelectors: ({selectCharactersState}) => ({
    ...adapter.getSelectors(selectCharactersState)
  })
});

/**
 * * **********************  SELECTOR FEATURES  ************************
 */
export const characterSelectFeature = createFeatureSelector<CharacterState>('characters')

export const totalCharacterSelectFeature = createFeatureSelector<number>('totalCharacters');

export const characterListSelectFeature = createFeatureSelector<Readonly<Character[]>>('characterList')

export const characterFilterSelectFeature = createFeatureSelector<CharacterFilterState>('characterFilter');
/**
 * * **********************  SELECTORS  ************************
 */
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

export const selectCharacterList = createSelector(
  characterListSelectFeature,
  (state) => state
)

export const selectCharacterFilter = createSelector(
  characterFilterSelectFeature,
  (state) => state.entities
)
