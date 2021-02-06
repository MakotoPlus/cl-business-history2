// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  amplify: {
    // AWS Amplify(Auth)の設定
    Auth: {
      region: 'ap-northeast-1',
      //Business-History
      userPoolId: 'ap-northeast-1_uMw7cMETC',
      userPoolWebClientId: 'h6lbqnvh1qbdlrtsm8sjc8iv5'
      //test-ampy
      //userPoolId: 'ap-northeast-1_unAwyh5IP',
      //userPoolWebClientId: '6oqsb2isut92t0btvplrogeapo'
    },
  },
  // API Gatewayのエンドポイントの設定
  //Business-History
  apiBaseUrl: 'https://wyr5gv4l36.execute-api.ap-northeast-1.amazonaws.com/dev',
  // Localstorageの設定
  // localstorageBaseKey: 'CognitoIdentityServiceProvider.<userPoolWebClientIdの値>.'
  //Business-History
  localstorageBaseKey: 'CognitoIdentityServiceProvider.h6lbqnvh1qbdlrtsm8sjc8iv5.'
  //----------------------------------------------------------------------
  //test-ampy
  // API Gatewayのエンドポイントの設定
  //apiBaseUrl: 'https://413s3ady8c.execute-api.ap-northeast-1.amazonaws.com/test',
  // Localstorageの設定
  // localstorageBaseKey: 'CognitoIdentityServiceProvider.<userPoolWebClientIdの値>.'
  //localstorageBaseKey: 'CognitoIdentityServiceProvider.h6lbqnvh1qbdlrtsm8sjc8iv5.'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
