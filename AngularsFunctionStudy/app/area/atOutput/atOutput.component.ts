import {Component, ViewChild} from "@angular/core";
import {AtOutputChildComponent} from "./atOutputChild/atOutputChild.component"
@Component({
    template: `
    <h2>@Output</h2>
    Componentのセレクターに出力方向の属性を追加します。
    <br>
    <a href="https://angular.io/docs/ts/latest/cookbook/component-communication.html"><参考></a>
    <br>
    <hr/>
    ReturnMessage [ {{sendText}} ] !
    <br>
    ⬇ChildComponent⬇
    <br>
    <atoutput-child-comp (emitEvent)="onEmitEvent($event)"></atoutput-child-comp>`
})
export class AtOutput{
    private sendText: string = "";
    private onEmitEvent(sendValue:any){
        this.sendText = sendValue;
    }
}