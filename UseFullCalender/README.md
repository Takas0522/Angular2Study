# UseFullCalender

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-beta.32.3.

## FullCalender
https://fullcalendar.io/license/

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## 参考
https://gearheart.io/blog/how-to-include-jquery-plugins-in-angular-2-running-via-webpack/

## jqueryをAngular-cliで使いたい
https://www.npmjs.com/package/angular-cli

Angular-cliでjqueryのビルドを通すために、[.angular-cli.json]の[scripts]に下記を追加します。

``` json
"../node_modules/jquery/dist/jquery.js"
```