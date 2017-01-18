import {Component} from "@angular/core";
@Component({
    template: `
    <h2>ngModelChange</h2>
    バインド変数の変化に応じて、発火するイベントです。<br>
    <br>
    <a href="https://angular.io/docs/ts/latest/api/common/index/NgClass-directive.html"><参考></a>
    <br>
    <hr/>
    <input [(ngModel)]="inputText" (ngModelChange)="onChangeInputText($event)"/>`
})
export class NgModelChangeComponent{
    private inputText: string;
    private onChangeInputText(eventValue: any){
        console.log(eventValue);
    }
}