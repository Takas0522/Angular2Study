import {Component} from "@angular/core";
@Component({
    template: `<h2>ngClass</h2>
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