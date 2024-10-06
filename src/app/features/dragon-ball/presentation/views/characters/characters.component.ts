import { Component, effect, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCharacters,selectLoaging, selectMeta, selectTotalCharacters } from '../../../store/characters';
import { LoadingComponent } from '../../components/loading/loading.component';
import { CardListComponent } from '../../components/card-list/card-list.component';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { SearchComponent } from '../../components/search/search.component';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [
    LoadingComponent, 
    CardListComponent, 
    InfiniteScrollDirective,
    SearchComponent
  ],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export default class CharactersComponent {
  private readonly _store = inject(Store);
  
  loading = this._store.selectSignal(selectLoaging);
  totalCharacters = this._store.selectSignal(selectTotalCharacters);
  meta = this._store.selectSignal(selectMeta);
  page = signal(1);
  limit = signal(8);

  ngOnInit(): void {
    this._store.dispatch(loadCharacters({page: this.page(), limit: this.limit()}))
  }

  onScroll(evt: any) {
    if (this.loading()) return;
    if (this.totalCharacters() >= this.meta()?.totalItems!) return;
    this.page.update((page) => ++page);
    this._store.dispatch(loadCharacters({page: this.page(), limit: this.limit()}));
  }

}
