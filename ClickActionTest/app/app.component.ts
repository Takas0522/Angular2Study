import { Component, ElementRef, HostListener } from '@angular/core';
@Component({
  selector: 'my-app',
  templateUrl: "app/app.html"
})
export class AppComponent {
  constructor(
    private _elementRef: ElementRef
  ){}
  imageInput(){
    var input = 
      this._elementRef.nativeElement.querySelector("#fileInput");
    input.click();
  }
 }
