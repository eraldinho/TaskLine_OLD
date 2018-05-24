// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyDK0WjY6vqDNV6M4GXzlTrD9QN0o9N6fok',
    authDomain: 'taskline-f802f.firebaseapp.com',
    databaseURL: 'https://taskline-f802f.firebaseio.com',
    projectId: 'taskline-f802f',
    storageBucket: 'taskline-f802f.appspot.com',
    messagingSenderId: '186680160230'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
