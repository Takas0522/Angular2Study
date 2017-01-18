import {Component, ElementRef} from "@angular/core";
import {ElementRefChildComponent} from "./child/elchild.component"
@Component({
    template: `    
    <h2>ElementRef</h2>
    Component内でHTMLElementにアクセスする際に使用します。<br>
    下の例では、全て同じComponentのセレクタを記述していますが<br>
    クリックされたコンポーネント内部のみのHTMLElementを取得しているため、他セレクタのコンポーネントは影響を受けません。
    <br>
    <a href="https://angular.io/docs/js/latest/api/core/index/ElementRef-class.html"><参考></a>
    <br>
    <hr/>
    <el-child></el-child>
    <br>
    <br>
    <el-child></el-child>
    <br>
    <br>
    <el-child></el-child>
    <br>
    <br>
    <el-child></el-child>
    <br>
    <br>
    <el-child></el-child>
    <br>
    <br>
    `
})
export class ElementRefComponent{}