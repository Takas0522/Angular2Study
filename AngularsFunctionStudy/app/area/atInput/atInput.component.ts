import {Component, ViewChild} from "@angular/core";
import {AtInputChildComponent} from "./atInputChildComponent/atInputChild.component"
@Component({
    template: `
    <h2>@Input</h2>
    Componentのセレクターに入力方向の属性を追加します。
    <br>
    <a href="https://angular.io/docs/ts/latest/cookbook/component-communication.html"><参考></a>
    <br>
    <hr/>
    Parent->SendMessage:
    <input [(ngModel)]="sendText" />
    <br>
    ⬇ChildComponent⬇
    <br>
    <atinput-child-comp [bindText]="sendText"></atinput-child-comp>`
})
export class AtInput{
    private sendText: string = "";
}