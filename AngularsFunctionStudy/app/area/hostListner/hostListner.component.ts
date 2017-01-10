import {Component, HostListener} from "@angular/core";
@Component({
    template: `and Hello Router Page`
})
export class HostListnerComponent{
    @HostListener("mousedown", ["$event"])
    onMouseDown(ev:Event){
        console.log(ev);
    }
}