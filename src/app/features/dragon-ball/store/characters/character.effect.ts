import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CharacterService } from '../../services/character.service';
import { loadCharacters, loadCharactersSuccess } from './character.action';
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
