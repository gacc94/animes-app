import { Component, computed, effect, EffectRef, inject, output, signal } from '@angular/core';
import { Character, characterListAction, selectCharacterList, selectCharacters, selectLoaging, totalCharacterAction } from '@app/features/dragon-ball/store/characters';
import { Store } from '@ngrx/store';
import { CardComponent } from '../card/card.component';
import { AppState } from '@app/shared/store/app.store';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent {
  private readonly _store = inject(Store<AppState>);

  items = this._store.selectSignal(selectCharacters);
  characterList = this._store.selectSignal(selectCharacterList);
  total = computed(() => this.characterList().length);

  charactersEffect: EffectRef = effect((_) => {
    this._store.dispatch(characterListAction({ characters: this.items() }));
    this._store.dispatch(totalCharacterAction({ total: this.total() }));
  }, { allowSignalWrites: true })

}
