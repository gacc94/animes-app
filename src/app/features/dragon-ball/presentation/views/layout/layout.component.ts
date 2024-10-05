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
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [JsonPipe, MatToolbarModule, MatIconModule, MatCardModule, MatButtonModule, NavbarComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export default class LayoutComponent {

  dataNavbar = signal<DataNavbar>({
    sourceImg: 'assets/images/Dragon_Ball_Z_Logo_C.png',
    altImg: 'Dragon_Ball_Z_Logo_C.png',
    list: ['characters', 'planets', 'transforms']
  })

}
