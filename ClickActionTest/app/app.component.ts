import { Component, ElementRef, HostListener } from '@angular/core';
@Component({
  selector: 'my-app',
  templateUrl: "app/app.html"
})
export class AppComponent {
  constructor(
    private _elementRef: ElementRef
  ){}
  private isMoveEvent: boolean = false;
  @HostListener("touchend", ["$event.target"])
  touchEnd(target: HTMLElement) {
    if (this.isMoveEvent){
      this.isMoveEvent = false;
      return;
    }
    this.mouseUp(target);
  }
  @HostListener("touchmove", ["$event.target"])
  touchMove(target: HTMLElement) {
      this.isMoveEvent = true;
  }
  @HostListener("mouseup", ["$event.target"])
  mouseUp(target: HTMLElement) {
    var targetId = target.id;
    if (targetId == "imageButton") {
        this.imageInput();
    }
}
private elementRefTest(){
  var elements = this._elementRef.nativeElement.querySelectorAll(".txt-fields");
  console.log(elements);
} 
  imageInput(){
    var input = 
      this._elementRef.nativeElement.querySelector("#fileInput");
    input.click();
  }
 }
