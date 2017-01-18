import {Component, ElementRef} from "@angular/core";
@Component({
    selector:"el-child",
    template: `<div id="target">Ｔａｒｇｅｔ</div>
    <br>
    <button (click)="onClickTargetChange()">CHANGE!</button>`
})
export class ElementRefChildComponent{
    constructor(
        private _el:ElementRef
    ){}
    private onClickTargetChange(){
        var target: HTMLElement = this._el.nativeElement.querySelector("#target");
        target.style.backgroundColor= "red";
    }
}