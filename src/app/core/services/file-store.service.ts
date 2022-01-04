import { Injectable } from '@angular/core';

import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class FileStoreService {
  storageRef = firebase.app().storage().ref();

  async subirImagen(nombre: string, imaBase64: any, iduser: number) {
    try {
      let res = await this.storageRef
        .child(`files/${iduser}/${nombre}`)
        .putString(imaBase64, 'data_url');
      console.log({ res });

      return res.ref.getDownloadURL();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // private cargarImagen(file: any, width: number) {
  //   let reader = new FileReader();

  //   reader.readAsDataURL(file);

  //   reader.onloadend = (e) => {
  //     const imgElement: any = document.createElement('img');
  //     imgElement.src = e.target.result;
  //     imgElement.onload = (event2) => {
  //       const canvas = document.createElement('canvas');

  //       if (event2.target.width > width) {
  //         const scaleSize = width / event2.target.width;
  //         canvas.width = width;
  //         canvas.height = event2.target.height * scaleSize;
  //       } else {
  //         canvas.width = event2.target.width;
  //         canvas.height = event2.target.height;
  //       }

  //       const ctx = canvas.getContext('2d');

  //       ctx.drawImage(event2.target, 0, 0, canvas.width, canvas.height);

  //       const source = ctx.canvas.toDataURL('image/webp');

  //       return this.subirImagen(file.name, source);
  //     };
  //   };
  // }
}
