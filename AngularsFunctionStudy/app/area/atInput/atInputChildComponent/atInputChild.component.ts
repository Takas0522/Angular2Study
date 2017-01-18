import {Component, Input} from "@angular/core";
@Component({
    selector:"atinput-child-comp",
    template: `This is @Input Child Component
    <br>
    Bind {{bindText}} !!`
})
export class AtInputChildComponent{
    constructor(){}
    @Input()
    bindText: string;
}