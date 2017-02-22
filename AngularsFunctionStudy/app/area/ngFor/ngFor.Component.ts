import {Component, OnInit} from "@angular/core";
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
    <select [(ngModel)]="levelNum" (change)="log()" >
      <option *ngFor="#level of levels" [value]="level.num">{{ level.name }} -  {{ type(level.num) }}</option>
    </select>
    </select>
    `
})
export class NgForComponent implements OnInit{
    private showArray: SampleArray[] = [{code: 1, name:"TKS0522"}, {code: 2, name: "HogeHoge"},{code: 3, name:"FugaFuga"}];
    private selectArray: SampleArray[] = [{code: 10, name:"AAA"}, {code: 20, name: "BBB"},{code: 30, name:"CCC"}];
    private selectedValue: number = 10;
    ngOnInit(){
        /*JSON Value nothing "double quate"*/
        let jsonData = JSON.stringify(this.selectedValue);
        console.log(jsonData);
    }
    onSelectedValueChange(){
        let jsonData = JSON.stringify(this.selectedValue);
        /*add "double quate"!*/
        console.log(typeof this.selectedValue);
        console.log(jsonData);
    }
}
class SampleArray {
    code: number;
    name: string;
}