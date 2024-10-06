import { Component, computed, effect, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  searchCntrl = signal<FormControl<string>>(new FormControl());
  valueSearch = toSignal(this.searchCntrl().valueChanges.pipe(
    debounceTime(1000),
    distinctUntilChanged(),
  ));

  effectSearch = effect(() => {
    console.log(this.valueSearch());
  })

  ngOnInit(): void {
    

  }
}
