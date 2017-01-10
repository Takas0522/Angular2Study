import {Component, ViewChild} from "@angular/core";
import {AtOutputChildComponent} from "./atOutputChild/atOutputChild.component"
@Component({
    template: `Parent:
    Set child Component {{sendText}} !
    <br>
    <atoutput-child-comp (emitEvent)="onEmitEvent($event)"></atoutput-child-comp>`
})
export class AtOutput{
    private sendText: string = "";
    private onEmitEvent(sendValue:any){
        this.sendText = sendValue;
    }
}