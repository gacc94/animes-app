import { Component, inject, signal } from '@angular/core';
import { CharacterService } from '../../../services/character.service';
import { Store } from '@ngrx/store';
import { loadCharacters, selectCharacters, selectLoaging } from '../../../store/characters';
import { JsonPipe } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { NavbarComponent } from '../../../../../shared/components/navbar/navbar.component';
import { DataNavbar } from '../../../../../shared/interfaces/navbar.interface';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [JsonPipe, MatToolbarModule, MatIconModule, MatCardModule, MatButtonModule, NavbarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  private readonly _store = inject(Store);

  dataNavbar = signal<DataNavbar>({
    sourceImg: 'assets/images/Dragon_Ball_Z_Logo_C.png',
    altImg: 'Dragon_Ball_Z_Logo_C.png',
    list: ['Characters', 'Planets', 'Transforms']
  })

  $characters = this._store.selectSignal(selectCharacters);
  $loading = this._store.selectSignal(selectLoaging);
  page = signal(0);
  limit = signal(10);

  ngOnInit(): void {
    this._store.dispatch(loadCharacters({page: this.page(), limit: this.limit()}))
    this._store.select(selectCharacters).subscribe((characters) => {
      console.log(characters);
    });
  }

}
