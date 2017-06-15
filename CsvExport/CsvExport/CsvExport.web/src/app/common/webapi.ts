import { Injectable, Inject } from "@angular/core";
import { APP_BASE_HREF } from "@angular/common";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";

@Injectable()
export class WebApi {

    constructor(
        @Inject(APP_BASE_HREF) private _baseHref: string
    ) { }

    rootEndPoint = () => {
        const endP = this._baseHref;
        let returnString = "";
        if (endP + "" === "/") {
            returnString = endP;
        } else {
            returnString = endP + "/";
        }
        return returnString;
    }

    downloadFileGet(hasError: boolean): Observable<Object> {
        return Observable.create((observer: Observer<Object>) => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", this.rootEndPoint() + "api/CsvExport/?hasError=" + hasError, true);
            xhr.setRequestHeader("Accept", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 2) {
                    if (xhr.status === 200) {
                        xhr.responseType = "blob";
                    }
                }
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var contentType = "text/csv";
                        var blob = new Blob([xhr.response], { type: contentType });
                        observer.next(blob);
                        observer.complete();
                    } else {
                        observer.error(xhr);
                    }
                }
            }
            xhr.send();
        });
    }
}
