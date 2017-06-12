import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule }    from '@angular/forms';
import { Observable } from 'rxjs';

import { AppModule } from '../../app.module';
import { LoginComponent } from '../login.component';
import { newEvent, click } from '../../testing/test-utility';
import { LoginUser } from '../LoginUser';
import { LoginApi, Result } from '../login.api';
import { LoginService } from '../login.service';

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
            imports: [AppModule],
            providers: [
                { provide: Router, useClass: RouterStub }
            ]
        })
        .overrideComponent(LoginComponent, {
            set: {
                providers:[
                    {provide: LoginApi, useClass: LoginApiSpy},
                    {provide: LoginService, useClass: LoginService }
                ]
            }
        })
        .compileComponents();
    }));
    describe('初期状態', () => {
        beforeEach( async(() => {
            // テスト対象ComponentのCreateを行う
            createComponent();
        }));
        // 以下、テスト
        it ('初回Initialize', () => {
            expect(page.idInput.value).toBe('', 'userId');
            expect(page.passwordInput.value).toBe('', 'Password');
        });
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
    });
    describe('アクションテスト(ERR)', () => {
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
                expect(page.errorField.innerText).toEqual('ID/Passwordが一致しません');
            });
        });
    });
    describe('アクションテスト', () => {
        beforeEach(async() => {
            createComponent();
        });
        it ('Login実行テスト(成功)',
            inject([Router], (router: Router)=> {
            const spy = spyOn(router, 'navigateByUrl')
            page.addPageElements();
            page.idInput.value = 'a';
            page.idInput.dispatchEvent(newEvent('input'));
            page.passwordInput.value = 'a';
            page.passwordInput.dispatchEvent(newEvent('input'));
            click(page.loginButton);
            const navArgs = spy.calls.first().args[0];
            expect(navArgs).toBe('/home/');
        }));
    });
}

// Componentの作成
function createComponent() {
    
    // LoginComponentの生成
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

class LoginApiSpy {
    readonly users: LoginUser[] = [
        {userId: 'a', password: 'a'},
        {userId: 'b', password: 'b'}
    ]
    
    readonly successResult: Result = {result: true, message: ''};
    readonly failedResult: Result = {result: false, message: 'ERR'};

    loginAction(param: LoginUser): Observable<Result> {
        console.log(param);
        let data = this.users.filter(x => x.userId === param.userId && x.password === param.password );
        if (data && data.length > 0) {
            return Observable.of(this.successResult);
        } else {
            return Observable.of(this.failedResult);
        }
    }
}

class RouterStub {
    navigateByUrl(url:string) {return url;}
}

class Page {
    navSpy: jasmine.Spy;
    loginButton: DebugElement;
    idInput: HTMLInputElement;
    passwordInput: HTMLInputElement;
    errorFieldUserId: HTMLElement;
    errorFieldPassword: HTMLElement;
    errorField: HTMLElement;

    addPageElements() {
        // Elementの生成
        this.loginButton = fixture.debugElement.query(By.css('button')).nativeElement;
        this.idInput = fixture.debugElement.query(By.css('#userid')).nativeElement;
        this.passwordInput = fixture.debugElement.query(By.css('#password')).nativeElement;
        if (comp.formErrors.userId) {
            this.errorFieldUserId = fixture.debugElement.query(By.css('#errorfielduserid')).nativeElement;
        }
        if (comp.formErrors.password) {
            this.errorField = fixture.debugElement.query(By.css('#errorfieldpassword')).nativeElement;
        }
        if (comp.errorMessage) {
            this.errorField = fixture.debugElement.query(By.css('#errorfield')).nativeElement;
        }
    }
}