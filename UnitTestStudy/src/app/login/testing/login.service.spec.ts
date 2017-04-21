import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { LoginService } from '../login.service';
import { LoginUser } from '../LoginUser';

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