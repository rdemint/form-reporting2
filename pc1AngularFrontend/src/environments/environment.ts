// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: true,
	authUrl: "http://127.0.0.1:8000/token/",
	authRefreshUrl: "http://127.0.0.1:8000/token/refresh/",
	newUserUrl: "http://127.0.0.1:8000/users",
	root_url: 'http://127.0.0.1:8000/',
	practice_url: 'http://127.0.0.1:8000/practices/',
	daily_summary_url: 'http://127.0.0.1:8000/daily_summaries/',
	entity_url: 'http://127.0.0.1:8000/entities/',
	summary_overview_url: 'http://127.0.0.1:8000/summary_overviews/',
	specialties_url: 'http://127.0.0.1:8000/specialties/',
  providers_url: 'http://127.0.0.1:8000/providers/',
  collections_url: 'http://127.0.0.1:8000/collections/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
