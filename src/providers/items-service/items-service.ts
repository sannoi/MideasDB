import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ItemModel } from '../../models/item-model'

const STORAGE_KEY = 'items';

@Injectable()
export class ItemsServiceProvider {

  items: ItemModel[];

  constructor(private storage: Storage) { }

  public getAll() {
    return this.storage.get(STORAGE_KEY);
  }

  public add(item: ItemModel) {
    return this.getAll().then(result => {
      if (result) {
        result.push(item);
        return this.storage.set(STORAGE_KEY, result);
      } else {
        return this.storage.set(STORAGE_KEY, [item]);
      }
    });
  }

  public getOne(id: string) {
    return this.getAll().then(result => {
      if (result) {
        return result.filter(x => x.id === id);
      } else {
        return null;
      }
    });
  }

  public remove(id: string) {
    return this.getAll().then(result => {
      if (result) {
        var idx = this.findWithAttr(result, "id", id);
        if (idx > -1) {
          result.splice(idx, 1);
        }
        return this.storage.set(STORAGE_KEY, result);
      }
    });
  }

  findWithAttr(array, attr, value) {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  }

}
