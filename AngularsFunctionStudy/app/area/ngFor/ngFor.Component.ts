import {Component} from "@angular/core";
@Component({
    template: `
<h2>ngForSample</h2>
<div *ngFor="let item of showArray">
    {{item.code}} / {{item.name}}
</div>
    `
})
export class NgForComponent{
    private showArray: SampleArray[] = [{code: 1, name:"Ohkawa"}, {code: 2, name: "HogeHoge"},{code: 3, name:"FugaFuga"}];
}
class SampleArray {
    code: number;
    name: string;
}