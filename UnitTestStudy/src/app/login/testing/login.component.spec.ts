import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { AppModule } from '../../app.module';
import { LoginComponent } from '../login.component';
import { newEvent } from '../../testing/test-utility';

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
            expect(page.idInput.value).toBe(inputString, 'userId');
        });
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