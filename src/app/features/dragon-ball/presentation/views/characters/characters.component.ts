import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCharacters, selectCharacters, selectLoaging } from '../../../store/characters';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [MatIconModule, MatCardModule, MatButtonModule],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export default class CharactersComponent {
  private readonly _store = inject(Store);


  $characters = this._store.selectSignal(selectCharacters);
  $loading = this._store.selectSignal(selectLoaging);
  page = signal(0);
  limit = signal(8);

  ngOnInit(): void {
    this._store.dispatch(loadCharacters({page: this.page(), limit: this.limit()}))
    this._store.select(selectCharacters).subscribe((characters) => {
      console.log(characters);
    });
  }

}
