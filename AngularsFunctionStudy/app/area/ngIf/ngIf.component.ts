import {Component} from "@angular/core";
@Component({
    template: `
    <h2>ngFor</h2>
    スクリプト変数の状態に応じて、HTMLの表示批評を切り替えることが出来ます<br>
    <br>
    <a href="https://angular.io/docs/ts/latest/api/common/index/NgIf-directive.html"><参考></a>
    <br>
    <hr/>
    {{isShow}}
    <div *ngIf="isShow">ひょうじされた！</div>
    <br>
    <button (click)="onClickIsShowChangeButton()">Change!</button>
    `
})
export class NgIfComponent{
    private isShow: boolean = false;
    private onClickIsShowChangeButton(){
        this.isShow = !this.isShow;
    }
}