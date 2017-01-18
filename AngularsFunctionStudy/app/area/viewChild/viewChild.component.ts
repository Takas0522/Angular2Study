import {Component, ViewChild} from "@angular/core";
import {ChildComponent} from "./childComponent/child.Component"
@Component({
    template: `
    <h2>@ViewChild</h2>
    コンポーネントの高階関数や公開変数を利用する際に使用します<br>
    <br>
    <a href="https://angular.io/docs/ts/latest/api/core/index/ViewChild-decorator.html"><参考></a>
    <br>
    <hr/>
    <input [(ngModel)]="sendText" />
    <button (click)="sendMessageChidlComponet()">子ComponentにMessageを！</button>
    <br>
    <child-comp #ch></child-comp>`
})
export class ViewChildComponent{
    private sendText: string = "send Message";
    @ViewChild("ch") _childComponent: ChildComponent;
    private sendMessageChidlComponet(){
        this._childComponent.childText = this.sendText;
        this._childComponent.outputLogMessage(this.sendText + "のログをお送りします！");
    }
}