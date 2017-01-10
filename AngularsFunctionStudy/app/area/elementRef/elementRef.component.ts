import {Component, ElementRef} from "@angular/core";
import {ElementRefChildComponent} from "./child/elchild.component"
@Component({
    template: `<h2>Element Ref</h2>
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