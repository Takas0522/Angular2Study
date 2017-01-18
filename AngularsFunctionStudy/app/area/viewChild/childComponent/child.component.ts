import {Component} from "@angular/core";
@Component({
    selector:"child-comp",
    template: `This is Child Component
    <br>
    Send {{_childText}} !!`
})
export class ChildComponent{
    constructor(){}
    private _childText: string = "empty";
    set childText(value: string){
        this._childText = value;
    }
    hogehoge: string;
    outputLogMessage(outputMessage: string){
        console.log(outputMessage);
    }
}