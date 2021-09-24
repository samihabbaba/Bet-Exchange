// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// let mainUrl = 'https://localhost:44325/'
let mainUrl = 'https://api.xexchange.xyz/'
export const environment = {
  production: false,
  apiKey: "39e7311b3a0a4b25882a4811afed53fc",   // for the socket/signlaR
  // apiUrl: 'https://socket.vebobet.xyz/',
  // signalrEndpoint: 'https://socket.vebobet.xyz/hubs/datafeed'

  // apiUrl: 'https://api.xexchange.xyz/',
  apiUrl: `${mainUrl}`,
  signalrEndpoint: `${mainUrl}hubs/datafeed`,
  notificationsEndpoint: `${mainUrl}hubs/notifications`

  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
