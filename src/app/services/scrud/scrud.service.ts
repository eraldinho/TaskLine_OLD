import { Injectable } from '@angular/core';

//import { Observable } from 'rxjs/Observable';
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

  AddDoc2Collection(collectionName: string, data) {
    const collection = this.afs.collection(collectionName);
    collection.add(data)
    .then(() => console.log('success') ) .catch(err => console.log(err) )
  }
}
