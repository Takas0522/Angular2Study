import {Component, HostListener} from "@angular/core";
@Component({
    template: `
    <h2>@HostLitner</h2>
    発生コントロールに関わらず、Componentで発生したイベントを補足します。<br>
    下の例では、マウスダウンイベントを補足し、ログに落としています。<br>
    開発者ツールで確認してみてください。
    <br>
    <a href="https://angular.io/docs/ts/latest/api/core/index/HostListener-interface.html"><参考></a>
    <br>
    <hr/>
    `
})
export class HostListnerComponent{
    @HostListener("mousedown", ["$event"])
    onMouseDown(ev:Event){
        console.log(ev);
    }
}