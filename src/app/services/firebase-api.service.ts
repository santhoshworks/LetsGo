import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Poll } from '../model/Poll';

@Injectable()
export class FirebaseApiService {
  private basePath = '/Polls';
  items: AngularFireList<Poll[]> = null; //  list of objects
  item: AngularFireObject <Poll> = null; //   single object

  constructor(private db: AngularFireDatabase) { }

  getItemsList(query): AngularFireList<Poll[]>  {
    this.items = this.db.list(this.basePath);
    return this.items;
  }
  // Return a single observable item
  getItem(key: string): AngularFireObject<Poll> {
    const itemPath =  `${this.basePath}/${key}`;
    this.item = this.db.object(itemPath);
    return this.item;
  }

  createItem(item: Poll): void  {
    this.items.push(item)
      .catch(error => this.handleError(error));
  }


  // Update an existing item
  updateItem(key: string, value: any): void {
    this.items.update(key, value)
      .catch(error => this.handleError(error));
  }

  // Deletes a single item
  deleteItem(key: string): void {
      this.items.remove(key)
        .catch(error => this.handleError(error));
  }

  // Deletes the entire list of items
  deleteAll(): void {
      this.items.remove()
        .catch(error => this.handleError(error));
  }

  // Default error handling for all actions
  private handleError(error) {
    console.log(error);
  }
}
