import { Component, Inject } from "@angular/core";
import { APP_BASE_HREF } from "@angular/common";

import { WebApi } from "../common/webapi"
@Component({
    selector: "csv-export",
    templateUrl: "./csvexport.html"
})
export class CsvExportComponent {

    constructor(
        @Inject(APP_BASE_HREF) private _baseHref: string,
        private _webapi: WebApi
    ) { }

    private onClickCsvExport(hasError: boolean) {
        //// 単純パターン
        //window.location.href = this._baseHref + "api/CsvExport/?hasError=" + hasError;
        // IE対応
        this._webapi.downloadFileGet(hasError).subscribe(
            data => {
                this.downloadFile(data);
            },
            err => {
                alert("えらー！");
                console.log(err);
            }
        );
    }

    private downloadFile(data: any) {

        var blob = new Blob([(<any>data)], { type: "text/csv" });
        let csvFileName = "日本語ファイル名称.csv";

        if (window.navigator.msSaveOrOpenBlob) {
            //IEの場合
            navigator.msSaveBlob(blob, csvFileName);
        } else {
            //IE以外(Chrome, Firefox)
            let link = document.createElement("a");
            link.setAttribute("href", window.URL.createObjectURL(blob));

            link.setAttribute("download", csvFileName);
            document.body.appendChild(link);

            link.click();
            link.remove();
        }
    }
}
