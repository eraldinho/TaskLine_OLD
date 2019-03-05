import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  RetrieveCollectionWithID (collectionName: string): Observable<any> {
    return this.afs.collection(collectionName).snapshotChanges().pipe(
      map(arr => {
      return arr.map(snap => {
        const data = snap.payload.doc.data();
        const id = snap.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  RetrieveDocument(documentName: string): Observable<any> {
    return this.afs.doc(documentName).valueChanges();
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

  SetDocument(collectionName: string, documentName: string, data): Promise<number> {
    const doc = this.afs.doc(collectionName + '/' + documentName);
    return new Promise<number>(function (resolve, reject) {
      doc.set(data)
      .then(() => {
        console.log('success');
        resolve(1);
      } ) .catch(err => {
        console.log(err);
        reject(0);
      });
    });
  }

  UpdateDocument(collectionName: string, documentName: string, data): Promise<number> {
    const doc = this.afs.doc(collectionName + '/' + documentName);
    return new Promise<number>(function (resolve, reject) {
      console.log(data);
      console.log(doc.ref.id);
      if (doc.ref.id === 'null') {
        console.log('resolve');
        resolve(-1);
      }
      doc.update(data)
      .then(() => {
        console.log('success');
        resolve(1);
      }).catch(err => {
        reject(0);
      });
    });
  }

}
