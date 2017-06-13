import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class WebApi {
    
    constructor(
        private _http: Http
    ) {}

    postData<T>(url: string, param: any): Observable<T> {
        return this._http
        .post(url,JSON.stringify(param))
        .map(res => {
            return res.json() as T
        })
        .catch(
            this.errorHandler
        );
    }

    private errorHandler(error: any) {
        let errmsg = error.message || 'server error';
        return Observable.throw(errmsg);
    }
}