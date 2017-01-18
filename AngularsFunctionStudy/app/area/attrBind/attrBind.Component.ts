import {Component} from "@angular/core";
@Component({
    template: `
    <h2>AttrBind</h2>
    HTMLタグの属性にスクリプトで使用している変数値を使用するす際に使用します。<br>
    下記の例では、divタグにIDを設定しているので開発者ツール等で確認してみてください。
    <br>
    <a href="https://angular.io/docs/ts/latest/guide/attribute-directives.html"><参考></a>
    <br>
    <hr/>
    <div *ngFor="let item of showArray" [attr.id]="'hogehoge'+ item.code">
        {{item.code}} / {{item.name}}
    </div>
    `
})
export class AttrBind{
    private showArray: SampleArray[] = [{code: 1, name:"TKS0522"}, {code: 2, name: "HogeHoge"},{code: 3, name:"FugaFuga"}];
}
class SampleArray {
    code: number;
    name: string;
}