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

AngularのReactiveFormsは強力で柔軟性のあるFormModuleだと思います。

自分も実際の作業の際には非常にお世話になりました。

# ReactiveFormsについて

https://angular.io/docs/ts/latest/guide/reactive-forms.html

https://angular.io/docs/ts/latest/cookbook/form-validation.html

Angularの公式サイトが大変参考になります。

基本のキは、上記サイトで学習できるので、エンプラ脳でReactiveFormsの利用方法を考えてみようと思います。

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

``` typescript
export class BaseComponent {
    inputForm: FormGroup;
    formSettings: any;
    formErrors: any;
    validationMessage: any;

    constructor(
        private fb: FormBuilder
    ) {}

    buildForms() {
        this.fb.group(this.formSettings);
        this.inputForm.valueChanges.subscribe(data => {
            this.onValueChange(data);
        });
    }

    onValueChange(data?: any) {
        const form = this.inputForm;
        for(const field in this.formErrors){
            /* Initialize form's Errors */
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessage[field];
                for (const key in control.errors){
                    this.formErrors[field] += messages[key];
                }
                this.emitErrorAction(field);
            }
            if (control && control.dirty && control.valid) {
                this.emitNotErrorAction(field);
            }
        }
    }

    emitErrorAction(field: any) {
        /* エラー発生時処理、継承先で実装 */
    }

    emitNotErrorAction(field: any){
        /* エラー未発生時処理、継承先で実装 */
    }
}
```

Validationの設定を全部Componentに書いていくのも邪魔くさいので

ファイルを切って設定をモジュール化します。

``` typescript
export const USER_NAME_CONTROL_KEYWORD = 'username';
export const USER_NAME_CONTROL_SHOW_NAME = 'ユーザー名';
export const USER_NAME_MAX_LENGTH = 20;

export const USER_ID_CONTROL_KEYWORD = 'userid';
export const USER_ID_CONTROL_SHOW_NAME = 'ユーザID';
export const USER_ID_MAX_LENGTH = 10;

export const PASSWORD_CONTROL_KEYWORD = 'password';
export const PASSWOED_CONTROL_SHOW_NAME = 'パスワード';
export const PASSWORD_MAX_LENGTH = 8;

export const FORM_SETTING = {
    [USER_NAME_CONTROL_KEYWORD]:['', 
        [
            Validators.maxLength(USER_NAME_MAX_LENGTH)
        ]
    ],
    [USER_ID_CONTROL_KEYWORD]:['', 
        [
            Validators.required,
            Validators.maxLength(USER_ID_MAX_LENGTH)
        ]
    ],
    [PASSWORD_CONTROL_KEYWORD]:['', 
        [
            Validators.required,
            Validators.maxLength(PASSWORD_MAX_LENGTH)
        ]
    ]
}

export const FORM_ERRORS = {
    [USER_NAME_CONTROL_KEYWORD]:'',
    [USER_ID_CONTROL_KEYWORD]:'',
    [PASSWORD_CONTROL_KEYWORD]:''
}

const REQUIRED = 'required';
const MAXLEMGTH = 'maxlength';

export const VALIDATION_MESSAGES = {
    [USER_NAME_CONTROL_KEYWORD]: {
        [MAXLEMGTH]: ValidarionMessages.getMaxLengthMessage(USER_NAME_CONTROL_SHOW_NAME, USER_NAME_MAX_LENGTH)
    },
    [USER_ID_CONTROL_KEYWORD]: {
        [REQUIRED]: ValidarionMessages.getRequredMessage(USER_ID_CONTROL_SHOW_NAME),
        [MAXLEMGTH]: ValidarionMessages.getMaxLengthMessage(USER_ID_CONTROL_SHOW_NAME, USER_ID_MAX_LENGTH)
    },
    [PASSWORD_CONTROL_KEYWORD]: {
        [REQUIRED]: ValidarionMessages.getRequredMessage(PASSWOED_CONTROL_SHOW_NAME),
        [MAXLEMGTH]: ValidarionMessages.getMaxLengthMessage(PASSWOED_CONTROL_SHOW_NAME, PASSWORD_MAX_LENGTH)
    }
}

```

作成するComponentでBaseComponentを継承し、作成したValidarionのセッティングを読み込みます。
