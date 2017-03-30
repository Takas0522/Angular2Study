# UnitTestStudy

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

# Angularでテスト書いてみる。

Angularの公式リファレンスにあるJamineとかKarmaとか使ったことがないのでテストを書いてみる。

AngularはVer.4でお送りします。

# まずは画面を想定してみる

ログイン画面を想定してみる

画面構成
* ユーザーID
* パスワード
* ログインボタン
* エラー情報表示フィールド

機能
* ユーザーIDとパスワードはRequiredのエラーチェックをVerificationで
* ログイン時にAPIと通信してID/Passが一致するかのチェックを行う
* エラーが発生している場合はエラー情報表示フィールドにエラー情報を表示する
* ログイン成功したらページ繊維する

# では

まずはざっくりと形を作ってみる

``` html
<div *ngIf="formErrors" class="alert alert-danger" id="errorfield">
    {{ errorMessage }}
</div>
<div class="form-group">
    <label for="userid">UserId</label>
    <input type="text" id="userid" class="form-control" required >
</div>

<div class="form-group">
    <label for="password">Password</label>
    <input type="text" id="password" class="form-control" />
</div>
<button type="submit" class="btn btn-default">
    ログイン
</button>
```

``` typescript
@Component({
    selector:'login-comp',
    templateUrl: './login.html'
})
export class LoginComponent {

    formErrors: any = {
        'userId': '',
        'password': ''
    };

    private _errorMessage: string;
    get errorMessage() {
        return this._errorMessage;
    }
    set errorMessage(value: string) {
        this._errorMessage = value;
    }
}
```

雑い

# テスト用のHTMLエレメントの生成

Componentのテストの場合、テスト用のHTMLエレメントが必要となるようです。

先ほど作成したHTMLページと紐づけるような形で作成します。

全ての項目を紐づける必要はないと思います。

作成するテストケースたちに合わせて必要なもののみを紐づける感じで。

今回はそんな項目数ないので全部やっちゃいます。

``` typescript
class Page {
    //NavigationのJasmineSpy変数(関数のすげ替え等を行う)
    navSpy: jasmine.Spy;
    //以下、HTMLElement変数、実際のログインページのエレメントと紐づける
    loginButton: DebugElement;
    idInput: HTMLInputElement;
    passwordInput: HTMLInputElement;
    errorField: HTMLElement;

    addPageElements() {
        //login.htmlからエレメントを取得し、それを変数に割り当てる
        this.loginButton = fixture.debugElement.query(By.css('button')).nativeElement;
        this.idInput = fixture.debugElement.query(By.css('#userid')).nativeElement;
        this.passwordInput = fixture.debugElement.query(By.css('#password')).nativeElement;
        if (comp.formErrors) {
            //エラー時のみに表示される内容
            this.errorField = fixture.debugElement.query(By.css('#errorfield')).nativeElement;
        }
    }
}
```
# テストの記述

次にテストの記述を行います。

beforeEach()内でテストで使用する諸々の設定を行います。

この時に、先ほど作成した、ページ情報の作成も行います。

現状、テストが認識できればいいので、適当に生成していきます。

また、Angularの起動起点となるModuleをインポートしなければいけません。

テストを記述してみます。

画面が初回に表示された際のテストです。

画面に表示されている内容は、生成されたPageClassのエレメントのコントロール変数から取得します。

この場合は、InputとPasswordの値を取得し、空文字となっているかどうか、チェックをおこなっています。

``` typescript 
let fixture: ComponentFixture<LoginComponent>
let comp: LoginComponent;
let page: Page;

describe('ログインComponent', () => {
    describe('モジュールのSetUp', moduleSetup);
});

///
function moduleSetup() {
    beforeEach(async(() => {
        // テストの準備を行う。モジュールを読む
        TestBed.configureTestingModule({
            imports: [AppModule]
        })
        .compileComponents();
    }));
    describe('初期状態', () => {
        beforeEach( async(() => {
            // テスト対象ComponentのCreateを行う
            createComponent();
        }));
        // 以下、テスト
        it ('初回Initialize空文字チェック', () => {
            expect(page.idInput.value).toBe('', 'UserID');
            expect(page.passwordInput.value).toBe('', 'Password');
        });
    });
}

// Componentの作成
function createComponent() {
    
    // LoginComponentの生成(TestBedにのせる（表現あってるのかな？）)
    fixture = TestBed.createComponent(LoginComponent);

    // 生成されたComponentのインスタンスｗｐ取得
    comp = fixture.componentInstance;

    // ページを作成
    page = new Page();
    return fixture.whenStable().then(() => {
        fixture.detectChanges();
        page.addPageElements();
    });
}

class Page {
    navSpy: jasmine.Spy;
    loginButton: DebugElement;
    idInput: HTMLInputElement;
    passwordInput: HTMLInputElement;
    errorField: HTMLElement;

    addPageElements() {
        // Elementの生成
        this.loginButton = fixture.debugElement.query(By.css('button')).nativeElement;
        this.idInput = fixture.debugElement.query(By.css('#userid')).nativeElement;
        this.passwordInput = fixture.debugElement.query(By.css('#password')).nativeElement;
        if (comp.formErrors) {
            this.errorField = fixture.debugElement.query(By.css('#errorfield')).nativeElement;
        }
    }
}
```

テストを行っているのは下記の箇所です。

it以下でテストを行っています。

```typescript
it ('初回Initialize空文字チェック', () => {
    expect(page.idInput.value).toBe('', 'UserID');
    expect(page.passwordInput.value).toBe('', 'Password');
});
```

idInput/passwordInputが画面の項目にあたります。

初回のため、から状態なので、このテストは通ります。

結果を見てみましょう。

では、ComponentのInitialize時に空以外の文字をつっこんでみます。

HTMLを下記のように変更してみます。

``` html
<input type="text" id="userid" class="form-control" required value="HOGEHOGE" />
```

結果を見てみましょう。

Initialize時に文字列がInputに格納されているため、エラーとなっているのがわかります。

# データバインドの反映の確認

双方向にデータバインドする時、単純にコントロールに値を突っ込む

または、変数に値が反映されているかどうか、確認をしたいケースを想定します。

まずはコントロールに値を入力したしたときを想定してみます。

PageClassのInputエレメントに値を入力します。

オーソドックスなデータバインドを考えた場合

Inputは下記のように変更し、対応する変数をComponentに反映すれば良いですね。

``` html
<input type="text" id="userid" class="form-control" [(ngModel)]="userId" />
```

ログインページの場合、双方向のバインディングは過多な機能かもですが

テーマ的に双方でバインディングするようにしています。

テストはどのように記述するのでしょうか？

その場合は、Componentが乗っているTestBedの変更検知（DetectChange）を発火します。

Inputした値が反映されているかを確認する場合、下記の通りの記述となります。

``` typescript
it ('バインドテスト（HTML -> ComponentMember）', () => {
    // 登録する値
    const inputString = "HogeHoge";
    // 画面の項目に値を入力
    page.idInput.value = inputString;
    page.idInput.dispatchEvent(newEvent('input'));
    // 変更を通知
    fixture.detectChanges();
    expect(page.idInput.value).toBe(inputString, 'userId');
});
```

特徴的なのは、[page.idInput.dispatchEvent(newEvent('input'));]の部分ですね。

newEventのファンクションは、Angularのリファレンスからそのまま流用しているものを使用しています。

inputされた際のイベントを強制的に発火させ、Angularの変更検知に検知させているのかと思われます。

``` typescript
export function newEvent(eventName: string, bubbles = false, cancelable = false) {
  let evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
  evt.initCustomEvent(eventName, bubbles, cancelable, null);
  return evt;
}
```

今回はComponentのみでテストを行ってみました。

次はInjectするClassを用いて、テストを行ってみます。