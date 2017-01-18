import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>Hello {{name}}</h1>
  <br>
  <div *ngFor="let item of appLists">
    <a routerLink="{{item.url}}">{{item.name}}</a>
  </div>
  <br>
  <router-outlet></router-outlet>`,
})
export class AppComponent  { 
  name = 'Angular'; 
  private appLists: ApplicationList[] = [
    {name: "ngFor", url:"ngfor"}, 
    {name: "ngIf", url:"ngif"},
    {name: "ngClass", url:"ngclass"},
    {name: "attrBind", url:"attrbind"},
    {name: "ngModelChange", url:"ngmodelchange"},
    {name: "viewChild", url:"viewchild" },
    {name: "@Input", url: "atinput"},
    {name: "@Output", url: "atoutput"},
    {name: "ElementRef", url: "elementref"},
    {name: "HostListner", url: "hostlistner"},
    {name: "Pipe", url: "showpipe"},
    ]
}
class ApplicationList{
  name:string;
  url: string;
}
