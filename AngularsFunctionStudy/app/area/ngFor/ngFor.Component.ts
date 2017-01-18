import {Component} from "@angular/core";
@Component({
    template: `
    <h2>ngFor</h2>
    配列数に応じて、HTMLの繰り返しの記述が行なえます。<br>
    <br>
    <a href="https://angular.io/docs/ts/latest/api/common/index/NgFor-directive.html"><参考></a>
    <br>
    <hr/>
    <div *ngFor="let item of showArray">
        {{item.code}} / {{item.name}}
    </div>
    `
})
export class NgForComponent{
    private showArray: SampleArray[] = [{code: 1, name:"TKS0522"}, {code: 2, name: "HogeHoge"},{code: 3, name:"FugaFuga"}];
}
class SampleArray {
    code: number;
    name: string;
}