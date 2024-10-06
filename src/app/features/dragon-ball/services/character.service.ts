import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Response } from '../interfaces/response.interface';
import { Character } from '../store/characters';
import { delay } from 'rxjs';
import { environment } from '@env';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private readonly _http: HttpClient = inject(HttpClient);

  private readonly baseUrl = environment.apiUrlDBZ
  private readonly apiUrl = `${this.baseUrl}/characters`;

  getCharacters(page: number = 1, limit: number = 10){
    const url = `${this.apiUrl}?page=${page}&limit=${limit}`;
    return this._http.get<Response<Character>>(url).pipe(
      delay(2000)
    );
  }
}
