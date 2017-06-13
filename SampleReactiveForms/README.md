# SampleReactiveForms

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# エンプラ脳で考えるReactiveForms

AngularのReactiveFormsは素敵なFormModuleだと思います。

自分も実際の作業の際には非常にお世話になりました。

# ReactiveFormsについて

https://angular.io/docs/ts/latest/guide/reactive-forms.html

https://angular.io/docs/ts/latest/cookbook/form-validation.html

Angularの公式サイトが大変参考になります。

基本のキは、上記サイトで学習できるので、エンプラ脳でReactiveFormsの利用方法を考えてみようと思います。

記事作成当時のAngularはV4です。

# Formでほしい機能を考える

さて、エンプラな頭で考えたとき、WebApplicationは複数の入力Formを持つかとおもいます。

入力Formは複数あれど、それぞれの画面で共通してほしい機能は存在するはずです。

1. Validarionエラーチェック
2. エラーメッセージ
3. ページ遷移時の挙動
4. データ確定処理

まぁさくっとあげて上記な感じでしょうか。

では一個ずつ見ていきます。

# Validartionエラーチェック

これは、Angularの公式リファレンスにかかれているとおりの機能ですね。

ただ、各画面で共通した機能として作りたいので、ReactiveFormsをもつComponentのBaseClassを作成します。



また、各ApplicationでValidationの設定を全部Componentに書いていくのも邪魔くさいので

ファイルを切って設定をモジュール化します。



作成するComponentでBaseComponentを継承し、作成したValidarionのセッティングを読み込みます。

BaseComponentで、ValidationCheckに必要な作業をほぼ行っているので

実際のComponentに記述する量はガクッと減るかと思います。

getterでValidationSettingのコントロール名を返しているのは

ComponentのHtml内で使用するためです。

HTMLは下記のような作りになっています。

[formControl]となっているのが地味な味噌ですね。

ValidationSettingで設定している値を変更すると

関連項目のすべてに適用されるため

「DBの項目名称と一致してなかったテヘペロ」って場合も

最小限の変更で適切な箇所に変更を波及させることができます。

エラーメッセージについては、

「必須ですよ」とか「文字列Overですよ」とか一般的なエラー内容は集約して管理したいので


# エラーメッセージ

エラーメッセージ生成Classを作成しました。

Static宣言してnewなしで使えるようにしています。

# ページ遷移時の処理

入力中にページ遷移する場合、「いいの？」ってダイアログ出したい時があります。

そんな場合は、RoouterのDeactivateRouterを使用するのが良いですね。

下記の感じで作成しました。


DeactivateGuardを使用する際にGenerics<T>にComponent型を突っ込みます。

その際、BaseComponentを継承して作成されたComponentと指定することで

Activate判断処理において、Component内の処理を呼び出せるようにします。

Componentの「canDeActivateInputPage」処理では、独自のダイアログをだすなり

何かの条件のときのみ確認するなり、よしなに処理を実装することができます。

今回はBaseComponentに処理を記述しましたが、もちろん、継承先のComponentごとに実装をバラすこともできます。

Routerは下記のように設定します。

# データ確定時の処理

初っ端開いた状態だと、formはCleanな状態です。

Submitが走るとエラー状態にはなるものの

ValueChangeイベントが走らないため、FormsErrorsにエラー内容が格納されません。

なので、内部の全項目をDirty状態にして、ValidationCheckをあえて走らせる処理を実装します。

# あとは複製…

ValidationSettingとHtmlとComponentについては

画面に設定する項目に関するものだけを変更すれば、新しい画面が比較的ラクに作れるようになります。

# 最後に

今回作成したソースは下記リポジトリで管理しています。

