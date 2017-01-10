import {Component, ViewChild} from "@angular/core";
import {AtInputChildComponent} from "./atInputChildComponent/atInputChild.component"
@Component({
    template: `Parent:
    <input [(ngModel)]="sendText" />
    <br>
    <atinput-child-comp [bindText]="sendText"></atinput-child-comp>`
})
export class AtInput{
    private sendText: string = "";
}