import {Component} from "@angular/core";
import {KeisyoType} from "./keisyoPipe"
@Component({
    template: `
    <h2>Pipe</h2>
    バインド表示する際、Functionを通して整形して表示する機能です。<br>
    <br>
    <a href="https://angular.io/docs/ts/latest/guide/pipes.html"><参考></a>
    <br>
    <hr/>
    <div *ngFor="let item of peopleList; let i=index;">
        No.{{i}} : {{item.name|keisyoPipe:item.type}}
    </div>`
})
export class PipeShowComponent{
    private peopleList: People[] = [
        {name: "TKS0522", type:KeisyoType.yarou},
        {name: "ほげほげ", type:KeisyoType.sama},
        {name: "ふがふが", type:KeisyoType.chan},
        ]
}
class People{
    name: string;
    type: KeisyoType
}