import {Component} from "@angular/core";
import {KeisyoType} from "./keisyoPipe"
@Component({
    template: `
    <div *ngFor="let item of peopleList; let i=index;">
        No.{{i}} : {{item.name|keisyoPipe:item.type}}
    </div>`
})
export class PipeShowComponent{
    private peopleList: People[] = [
        {name: "大川", type:KeisyoType.yarou},
        {name: "ほげほげ", type:KeisyoType.sama},
        {name: "ふがふが", type:KeisyoType.chan},
        ]
}
class People{
    name: string;
    type: KeisyoType
}