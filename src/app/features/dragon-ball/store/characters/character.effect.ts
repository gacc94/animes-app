import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CharacterService } from '../../services/character.service';
import { loadCharacters, loadCharactersFilter, loadCharactersFilterError, loadCharactersFilterSuccess, loadCharactersSuccess } from './character.action';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CharacterEffects {

  private readonly _actions$ = inject(Actions);
  private readonly _characterService = inject(CharacterService);

  loadCharacter$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadCharacters),
      switchMap(({page, limit}) => {
        return this._characterService.getCharacters(page, limit).pipe(
          map(({items, meta, links}) => {
            return loadCharactersSuccess({ characters: items, meta, links });
          }),
          catchError((error) =>
            of(loadCharactersSuccess(error))
          )
        )
      })
    )
  );

}

@Injectable({
  providedIn: 'root'
})
export class CharacterFilterEffects {

  private readonly _actions$ = inject(Actions);
  private readonly _characterService = inject(CharacterService);

  loadFilterCharacter$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadCharactersFilter),
      switchMap(({name, race}) => {
        return this._characterService.getWithFilter(name).pipe(
          map((characters) => {
            return loadCharactersFilterSuccess({ characters });
          }),
          catchError((error) =>
            of(loadCharactersFilterError(error))
          )
        )
      })
    )
  );

}

