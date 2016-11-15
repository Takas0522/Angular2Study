import { Component, ElementRef, Renderer } from '@angular/core';
@Component({
  selector: 'my-app',
  templateUrl: "app/app.html"
})
export class AppComponent {
  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer
  ){}
  private targetId = "#addEventTarget";
  private eventOneFunc: Function;
  private onAddEventOne(){
    this.eventOneFunc = this._renderer.listen(this._elementRef.nativeElement.querySelector(this.targetId), "click", (event) => {
      this.showOneMessage();
    });
  }
  private onRemoveEventOne(){
    this.eventOneFunc();
  }
  private showOneMessage(){
    alert("This is Event One!");
  }
  private eventTwoFunc: Function;
  private onAddEventTwo(){
    this.eventTwoFunc = this._renderer.listen(this._elementRef.nativeElement.querySelector(this.targetId), "click", (event) => {
      this.showTwoMessage();
    });
  }
  private onRemoveEventTwo(){
    this.eventTwoFunc();
  }
    private showTwoMessage(){
    alert("This is Event Two!");
  }
 }
