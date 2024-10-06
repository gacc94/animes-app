import { Component, computed, effect, EffectRef, inject, output, signal } from '@angular/core';
import { Character, selectCharacters, selectLoaging, totalCharacterAction } from '@app/features/dragon-ball/store/characters';
import { Store } from '@ngrx/store';
import { CardComponent } from '../card/card.component';
import { AppState } from '@app/shared/store/app.store';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CardComponent, InfiniteScrollDirective],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent {
  private readonly _store = inject(Store<AppState>);

  items = this._store.selectSignal(selectCharacters);
  characterList = signal<Character[]>([]);
  total = computed(() => this.characterList().length);

  charactersEffect: EffectRef = effect((_) => {
      this.characterList.update((characters) => [...characters, ...this.items()]);
      this._store.dispatch(totalCharacterAction({total: this.total()}));
    }, {allowSignalWrites: true})

}
