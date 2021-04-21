// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  URL: 'https://innsalesbackend.herokuapp.com',
  URL_SOCKET: 'https://innsalesbackend.herokuapp.com/connections/:3000',
  firebaseConfig: {
    apiKey: "AIzaSyAOceN_KOhtM7gJrRdVB44xgd7LbtOElhY",
    authDomain: "inn-sales.firebaseapp.com",
    projectId: "inn-sales",
    storageBucket: "inn-sales.appspot.com",
    messagingSenderId: "652463002850",
    appId: "1:652463002850:web:c5e9ba680e7f9f3504babb"
  }
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
