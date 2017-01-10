import {Component, Output, EventEmitter} from "@angular/core";
@Component({
    selector:"atoutput-child-comp",
    template: `This is @Output Child Component
    <br>
    <input [(ngModel)]="sendText" />
    <br>
    <button (click)="onSendButtonClick()">親ComponentにSend</button>`
})
export class AtOutputChildComponent{
    private sendText: string = "";
    constructor(){}
    @Output()
    emitEvent = new EventEmitter;
    private onSendButtonClick(){
        this.emitEvent.emit(this.sendText);
    }
}