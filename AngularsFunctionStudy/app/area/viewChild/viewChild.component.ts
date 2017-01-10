import {Component, ViewChild} from "@angular/core";
import {ChildComponent} from "./childComponent/child.Component"
@Component({
    template: `<input [(ngModel)]="sendText" />
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