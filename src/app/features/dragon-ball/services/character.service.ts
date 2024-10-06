import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '../interfaces/response.interface';
import { Character } from '../store/characters';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(
    private readonly _http: HttpClient
  ) { }

  getCharacters(page: number = 1, limit: number = 10){
    return this._http.get<Response<Character>>(`https://dragonball-api.com/api/characters?page=${page}&limit=${limit}`).pipe(
      delay(2000)
    );
  }
}
