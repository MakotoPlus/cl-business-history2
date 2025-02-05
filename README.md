# ClBusinessHistory2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

AWS Profile yahoo(2024/04 Acctount)

POC環境用のbuild方法
`ng build -c poc'

環境構築

```
node 16.20.1
npm install --legacy-peer-deps
npm run start
```

下記ファイルに環境内容設定
src/environments/environment.ts
この設定は
angular.jsonで振分けられている poc, dev, prodocution 実際pocしか動かしていないから他は保証ない

Deploy用のBuild
```
ng build -c poc
ng build -c dev
ng build -c prd
```

dist/cl-business-history2フォルダにコンパイル後のファイルが出来るのでS3へPushする(手動)
```
cd dist/cl-business-history2
aws s3 cp . s3://dev-business-history/ --recursive --profile yahoo

```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
