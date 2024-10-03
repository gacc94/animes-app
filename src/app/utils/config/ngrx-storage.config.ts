import { ActionReducer, MetaReducer } from "@ngrx/store";
import { localStorageSync } from 'ngrx-store-localstorage';

export class LocalStorageSyncService {

  static syncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({
      keys: ['user'],  // Aquí defines qué slices del estado quieres persistir
      rehydrate: true,  // Recarga el estado del almacenamiento al iniciar la app
    })(reducer);
  }

  static getMetaReducers(): MetaReducer<any>[] {
    return [this.syncReducer];
  }

}
