// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'crud-employee-6ac7a',
    appId: '1:696142149306:web:2eac2066e0b436fd6e7483',
    storageBucket: 'crud-employee-6ac7a.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyCFARNMkSsCLZJJkMCkLZq1hjcAJWQpArc',
    authDomain: 'crud-employee-6ac7a.firebaseapp.com',
    messagingSenderId: '696142149306',
  },
  production: false,
  api: {
    // baseUrl: 'https://aprendeenlinea.herokuapp.com/',
    baseUrl: 'https://apiclassroom.herokuapp.com/',
  },
  useHash: false,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
