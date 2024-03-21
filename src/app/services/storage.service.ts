import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  async get(key): Promise<any> {
    const ret = await Preferences.get({ key });
    return JSON.parse(ret.value);
  }

  async set(key, value): Promise<void> {
    await Preferences.set({ key, value: JSON.stringify(value) });
  }

  async remove(key): Promise<void> {
    await Preferences.remove({ key });
  }

  async clear() {
    await Preferences.clear();
  }
}
