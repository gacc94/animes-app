import { Component, inject, signal } from '@angular/core';
import { CharacterService } from '../../../services/character.service';
import { Store } from '@ngrx/store';
import { loadCharacters, selectCharacters } from '../../../store/characters';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  private readonly _store = inject(Store);

  characters = this._store.selectSignal(selectCharacters);
  page = signal(0);
  limit = signal(10);

  ngOnInit(): void {
    this._store.dispatch(loadCharacters({page: this.page(), limit: this.limit()}))
  }

}
