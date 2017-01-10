import {Component} from "@angular/core";
@Component({
    template: `<h2>NgModelChange</h2>
    <input [(ngModel)]="inputText" (ngModelChange)="onChangeInputText($event)"/>`
})
export class NgModelChangeComponent{
    private inputText: string;
    private onChangeInputText(eventValue: any){
        console.log(eventValue);
    }
}