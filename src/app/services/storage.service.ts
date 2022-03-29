import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  async get(key): Promise<any> {
    const ret = await Storage.get({ key });
    return JSON.parse(ret.value);
  }

  async set(key, value): Promise<void> {
    await Storage.set({ key, value: JSON.stringify(value) });
  }

  async remove(key): Promise<void> {
    await Storage.remove({ key });
  }

  async clear() {
    await Storage.clear();
  }
}
