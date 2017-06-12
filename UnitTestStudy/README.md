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

Angularの公式リファレンスにあるJamineとかKarmaとか使ったことがないのでテストを書いてみます。

AngularはVer.4でお送りします。

ちなみに、AngularのComponentからテストを生成してくれる便利拡張機能があるようです。

https://marketplace.visualstudio.com/items?itemName=SimonTest.simontest


# まずは画面を想定してみる

ログイン画面を想定してみる

画面構成
* ユーザーID
* パスワード
* ログインボタン
* エラー情報表示フィールド

機能
* ユーザーIDとパスワードはRequiredのエラーチェックをVerificationで行う
* ログイン時にAPIと通信してID/Passが一致するかのチェックを行う
* エラーが発生している場合はエラー情報表示フィールドにエラー情報を表示する
* ログイン成功したらページ遷移する

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

雑い！

# テスト用のHTMLエレメントの生成

Componentのテストの場合、テスト用のHTMLエレメントが必要となるようです。

先ほど作成したHTMLページと紐づけるような形で作成します。

全ての項目を紐づける必要はないと思います。

作成するテストケースたちに合わせて必要なもののみを紐づける感じで。

今回はそんな項目数ないので全部やっちゃいます。初期のだんかいなのでてきとーに。

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

この時に、先ほど作成したクラスで、テストページの作成も行います。

現状、テストが認識できればいいので、適当に生成していきます。

Angularの起動起点となるModuleをインポートしなければいけません。Sテストを記述してみます。

まずは、画面が初回に表示された際のテストです。

画面に表示されている内容は、生成されたPageClassのエレメントのコントロール変数から取得します。

この場合は、InputとPasswordの値を取得し、空文字となっているかどうか、チェックをおこなっています。

``` typescript 
let fixture: ComponentFixture<LoginComponent>
let comp: LoginComponent;
let page: Page;

describe('ログインComponent', () => {
    describe('モジュールのSetUp', moduleSetup);
});

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
    
    // LoginComponentの生成(TestBedにのせる（「のせる」って表現あってるのかな？）)
    fixture = TestBed.createComponent(LoginComponent);

    // 生成されたComponentのインスタンスを取得
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

テストを行っているのはit以下で、下記の箇所です。

```typescript
it ('初回Initialize空文字チェック', () => {
    expect(page.idInput.value).toBe('', 'UserID');
    expect(page.passwordInput.value).toBe('', 'Password');
});
```

idInput/passwordInputがPageClassで生成される画面の項目にあたります。

初回のため、空状態なので、このテストは通ります。

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
    expect(comp.loginUser.userId).toBe(inputString, 'userId');
});
```

特徴的なのは、[page.idInput.dispatchEvent(newEvent('input'));]の部分ですね。

newEventのファンクションは、Angularのリファレンスからそのまま流用しているものを使用しています。

inputされた際のイベントを発火させ、Angularの変更検知に検知させているのかと思われます。

``` typescript
export function newEvent(eventName: string, bubbles = false, cancelable = false) {
  let evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
  evt.initCustomEvent(eventName, bubbles, cancelable, null);
  return evt;
}
```

# サービスClass単体のテスト

何かしらのサービスクラスみたいなものを作ったとします。

過剰な気はしますが、ログイン情報をLoweCaseにするサービスがあったとします。

クラスとしてはこのような感じですかね。

``` typescript
@Injectable()
export class LoginService {
    changeLowerCase(loginUser: LoginUser): LoginUser {
        return {
            userId: loginUser.userId.toLowerCase(),
            password: loginUser.password.toLowerCase()
        }
    }
}
```

テストを作成する際、Class単体をテストする場合は、シンプルな形でテストできます。

``` typescript
describe('サービステスト', () => {
    let _service: LoginService;

    beforeEach(() => {
        _service = new LoginService();
    });

    describe('lowercaseテスト', () => {
        it ('全部小文字', () => {
            let testData:LoginUser = { userId: 'abc', password: 'def' };
            let res = _service.changeLowerCase(testData);
            expect(res).toEqual(testData);
        });
        it ('全部大文字', () => {
            let testData:LoginUser = { userId: 'ABC', password: 'DEF' };
            let res = _service.changeLowerCase(testData);
            expect(res.userId).toEqual('abc');
            expect(res.password).toEqual('def');
        });
    });
});
```

単純にServiceのインスタンスを生成して実行するだけです。

# formValidationを伴うテスト

https://angular.io/docs/ts/latest/cookbook/form-validation.html

上記のReacti1veのパターンを使用した場合のテストを記述してみます。

結果、バインド部分で失敗します。

と、いうのもコントロールで入力された値はForumbuiderのメンバ変数のValueに格納されるためです。

と、このように機能の変更によるデグレを発見することができました。

テストを変更するか、実装を変更するかは実際にソースに左右されると思います。

ひとまずテストを変更するとこのような形でテストが通るようになります。

``` typescript
it ('バインドテスト（HTML -> ComponentMember）', () => {
    // 登録する値
    const inputString = "HogeHoge";
    // 画面の項目に値を入力
    page.idInput.value = inputString;
    page.idInput.dispatchEvent(newEvent('input'));
    // 変更を通知
    fixture.detectChanges();
    expect(comp.inputForm.value.userId).toBe(inputString, 'userId');
});
```

# Spyテスト

さて、Login処理は最終的にWebAPIで認証処理が行われます。

ただ、WebAPIの処理はまだ作成していませんし

WebAPIが絶対にないとテストできないというのは利便性にかけます。

WebAPIとのやりとりをサービスクラスで分離し、LoginComponentからProvideしているとした場合

APIの処理を別の処理にすげかえることにより、APIの有無に関わらずテストが実行可能となります。

例えば、下記のようなAPIとの通信を行うサービスがあります。

RESTAPI的にどないやねん感がありますが、api/loginにPOSTを投げて、Resulet型が返却されるAPI処理を行っています。

``` typescript
export class LoginApi {
    constructor(
        private _api: WebApi
    ) {}
    loginAction(param: LoginUser): Observable<Result> {
        return this._api.postData('api/login', param);
    }
}
```

上記をComponentで下記のように使用しています。

``` typescript
onSubmit() {
    this._api.loginAction(this.loginUser).subscribe(data =>{
        if (data.result) {
            //何かしらの処理
        }
    });
}
```

テストを記述する際

ComponentからProvideしているサービスはSpyを使用するようすげ替えます。

Spyクラスは下記のように作成してみました。

``` typescript
class LoginApiSpy {
    readonly users: LoginUser[] = [
        {userId: 'a', password: 'a'},
        {userId: 'b', password: 'b'}
    ]
    
    readonly successResult: Result = {
        result: true, 
        message: ''
    };
    readonly failedResult: Result = {
        result: false, 
        message: 'ERR'
    };

    loginAction(param: LoginUser): Observable<Result> {
        let data = this.users.filter(x => x.userId === param.userId && x.password === param.password );
        if (data) {
            return Observable.of(this.successResult);
        } else {
            return Observable.of(this.failedResult);
        }
    }
}
```

APIの処理（loginAction）を内部で完結するように変更を行っています。

Observableでの返却は.ofを使用して返却しています。

このSpyClassを使用することを、Specファイルで記述しなくてはなりません。

BeforeEachでの記述が下記のようになります。

「LoginService」は外部に依存する処理が存在しないためそのまま使用しています。

``` typescript
beforeEach(async(() => {
    // テストの準備を行う。モジュールを読む
    TestBed.configureTestingModule({
        imports: [AppModule]
    })
    .overrideComponent(LoginComponent, {
        set: {
            providers:[
                // provieするLoginApiをSpyクラスで代替
                {provide: LoginApi, useClass: LoginApiSpy},
                {provide: LoginService, useClass: LoginService }
            ]
        }
    })
    .compileComponents();
}));
```

テストを記述していきます。

``` typescript
describe('アクションテスト', () => {
    beforeEach(async() => {
        createComponent();
    });
    it ('Login実行テスト(エラー条件)', ()=> {
        page.addPageElements();
        page.idInput.value = 'a';
        page.idInput.dispatchEvent(newEvent('input'));
        page.passwordInput.value = 'b';
        page.passwordInput.dispatchEvent(newEvent('input'));
        click(page.loginButton);
        Observable.of('')
        .delay(1000).subscribe(() => {
            page.addPageElements();
            expect(page.errorFielSd.innerText).toEqual('ID/Passwordが一致しません');
        });
    })
});
```
テストが取らなかった際のエラーチェックです。

page.input.[コントロール名].valueで値をHTMLのコントロール上に投入し、

dispacthEventで入力された内容を、Angulerに反映します。

ログインページ、パスワードに値を投入した後、ログインボタンをクリックすることで

Submit処理が発火され、先程作成したSpyを使用して、ログイン処理を実行します。

login.component.tsでは、ログイン処理を下記のように記載しています。

IDとパスが一致しない場合はエラーメッセージを画面上に表示するようになっています。

``` typescript
this._api.loginAction(this.loginUser).subscribe(data =>{
    if (data.result) {
        //hogehoge
    } else  {
        this._errorMessage = 'ID/Passwordが一致しません';
    }
});
```

エラーメッセージは、下記のように、*ngIfで表示するようになっています。

``` html
<div *ngIf="errorMessage" class="alert alert-danger" id="errorfield">
    {{errorMessage}}
</div>
```

ngIfで表示を制御している場合、変数への値豆乳から、画面への描画まで

若干のタイムラグが発生するため、テストを記述する際は注意が必要です。

上コードで記述しているように、Delayを発生させ、画面への描画を待機させ

その後に画面コントロールを取得しないと、Elementを取得できずにテストが失敗します。

``` typescript
Observable.of('')
.delay(1000).subscribe(() => {
    page.addPageElements();
    expect(page.errorFielSd.innerText).toEqual('ID/Passwordが一致しません');
});
```

諸々修正したら、下図のようにテストが通りました。

# rouringのテスト

最後に、ログインが成功した場合に行われるPage遷移のテストを記述します。

上記の処理が成功した場合、「home」に遷移する処理を記述してみます。

``` typescript
this._api.loginAction(this.loginUser).subscribe(data =>{
    if (data.result) {
        this._router.navigateByUrl('home');
    } else  {
        this._errorMessage = 'ID/Passwordが一致しません';
    }
});
```


