import {Component} from "@angular/core";
@Component({
    template: `
<h2>ngForSample</h2>
<div *ngFor="let item of showArray" [attr.id]="'hogehoge'+ item.code">
    {{item.code}} / {{item.name}}
</div>
    `
})
export class AttrBind{
    private showArray: SampleArray[] = [{code: 1, name:"Ohkawa"}, {code: 2, name: "HogeHoge"},{code: 3, name:"FugaFuga"}];
}
class SampleArray {
    code: number;
    name: string;
}