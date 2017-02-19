import {Component} from "@angular/core";
@Component({
    template: `
    <h2>ngCLass</h2>
    スクリプト内の変数の状態に応じてClassを変更する事ができます<br>
    <br>
    <a href="https://angular.io/docs/ts/latest/api/common/index/NgClass-directive.html"><参考></a>
    <br>
    <hr/>
    <div [ngClass]="{countforStyle:countNum == 4}">Count: {{countNum}}</div>
    <br>
    <button (click)="onClickCountUpButton()">CountUp!</button>
    `,
    styles: [
        `
        .countforStyle { background-color:red; }
        `
    ]
})
export class NgClassComponent{
    private countNum: number = 0;
    private onClickCountUpButton(){
        this.countNum++;
    }
}