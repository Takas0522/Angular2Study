import { Component, Injectable, Inject } from "@angular/core";
import { APP_BASE_HREF } from '@angular/common';
import { Http, Request, Response, Headers, RequestOptions } from "@angular/http";
import { Observable, Subject, ReplaySubject } from "rxjs/Rx";

@Injectable()
export class WebApiAction {
    constructor(
        @Inject(APP_BASE_HREF) private _baseHref: string,
        private http: Http
    ) { }
    private headersContent(): RequestOptions {
        let hea = new Headers();
        let ret = new RequestOptions({ headers: hea });
        return ret;
    }

    private rootEndPoint = () => {
        let endP = this._baseHref;
        let returnString = "";
        if (endP == "/") {
            returnString = endP;
        } else {
            returnString = endP + "/";
        }
        return returnString;
    }

    private putData<T>(url: string, sendData: FormData) {
        return this.http
            .put(this.rootEndPoint() + url, sendData, this.headersContent)
            .map(res => res.json())
            .catch(error =>
            {
                alert(error);
                return Observable.throw(error)
            });
    }

    private postFileData<T>(url: string, sendData: FormData) {
        return this.http
            .post(this.rootEndPoint() + url, sendData, this.headersContent)
            .map(res => res.json())
            .catch(error => {
                alert(error);
                return Observable.throw(error)
            });
    }

    private getData<T>(url: string) {
        return this.http
            .get(this.rootEndPoint() + url, this.headersContent)
            .map(res => res.json())
            .catch(error => {
                alert(error);
                return Observable.throw(error)
            });
    }

    getValue(): Observable<string[]>{
        return this.getData<string[]>("api/Values");
    }

    putUploadFile(formData: FormData): Observable<any> {
        return this.postFileData<any>("api/FileOperation", formData);
    }

    getFileLists(): Observable<string[]> {
        return this.getData<any>("api/FileOperation");
    }
}