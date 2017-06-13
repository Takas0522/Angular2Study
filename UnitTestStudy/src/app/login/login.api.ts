import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { WebApi } from '../common/webapi';
import { LoginUser } from './LoginUser';

@Injectable()
export class LoginApi {
    constructor(
        private _api: WebApi
    ) {}
    loginAction(param: LoginUser): Observable<Result> {
        return this._api.postData<Result>('api/login', param);
    }
}

export class Result {
    result: boolean;
    message: string;
}