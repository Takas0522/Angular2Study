import {Component} from "@angular/core";
@Component({
    template: `<h2>ngIf</h2>
    {{isShow}}
    <div *ngIf="isShow">ひょうじされた！</div>
    <br>
    <button (click)="onClickIsShowChangeButton()">Change!</button>
    `
})
export class NgIfComponent{
    private isShow: boolean = false;
    private onClickIsShowChangeButton(){
        this.isShow = !this.isShow;
    }
}