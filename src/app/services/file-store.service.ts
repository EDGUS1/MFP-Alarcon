import { Injectable } from '@angular/core';

import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class FileStoreService {
  storageRef = firebase.app().storage().ref();
  constructor() {}

  async subirImagen(nombre: string, imaBase64: any) {
    try {
      let res = await this.storageRef
        .child('files/1234/' + nombre)
        .putString(imaBase64, 'data_url');
      // console.log({ res });

      return res.ref.getDownloadURL();
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
