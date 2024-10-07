import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { CharacterService } from '@app/features/dragon-ball/services/character.service';
import { Store } from '@ngrx/store';
import { characterListAction, loadCharactersFilter, selectCharacterFilter } from '@app/features/dragon-ball/store/characters';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  private readonly _store = inject(Store);

  charactersFilter = this._store.selectSignal(selectCharacterFilter)
  searchCntrl = signal<FormControl<string>>(new FormControl());
  // valueSearch = toSignal(this.searchCntrl().valueChanges.pipe(
  //   debounceTime(1000),
  //   distinctUntilChanged(),
  // ));

  effectSearch = effect(() => {
    // console.log(this.valueSearch());
    console.log(this.charactersFilter());
    // this.getCharacterWithFilter(this.valueSearch());
  }, { allowSignalWrites: true })

  ngOnInit(): void {
    this.searchCntrl().valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
    ).subscribe((value) => {
      this.getCharacterWithFilter(value);
    })
  }

  getCharacterWithFilter(value?: string) {
    if (!value) return;
    this._store.dispatch(loadCharactersFilter({name: value, race: ''}))
  }

}
