import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class ScrudService {

  constructor(private afs: AngularFirestore) { }

  RetrieveCollection(collectionName: string): Observable<any> {
    return this.afs.collection(collectionName).valueChanges();
  }

  AddDoc2Collection(collectionName: string, data): Promise<number> {
    const collection = this.afs.collection(collectionName);
    return new Promise<number>(function (resolve, reject) {
      collection.add(data)
      .then(() => {
        console.log('success');
        resolve(1);
      } ) .catch(err => {
        console.log(err);
        reject(0);
      });
    });
  }
}
