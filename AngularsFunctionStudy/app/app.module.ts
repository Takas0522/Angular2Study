import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { AppComponent }  from './app.component';
import { DefaultComponent } from "./area/default/default.component";
import { AppRoutingModule }     from './app.routingmodule';

import { NgForComponent } from "./area/ngFor/ngFor.component";
import { NgClassComponent } from "./area/ngClass/ngClass.component";
import { NgIfComponent } from "./area/ngIf/ngIf.component";
import { AttrBind } from "./area/attrBind/attrBind.component";
import { NgModelChangeComponent } from "./area/ngModelChange/ngModelChange.component";
import { ViewChildComponent } from "./area/viewChild/viewChild.component";
import { ChildComponent } from "./area/viewChild/childComponent/child.component";
import { AtInput } from "./area/atInput/atInput.component";
import { AtInputChildComponent } from "./area/atInput/atInputChildComponent/atInputChild.component";
import { AtOutput } from "./area/atOutput/atOutput.component";
import { AtOutputChildComponent } from "./area/atOutput/atOutputChild/atOutputChild.component";
import { ElementRefComponent } from "./area/elementRef/elementRef.component";
import { ElementRefChildComponent } from "./area/elementRef/child/elchild.component";
import {HostListnerComponent } from "./area/hostListner/hostListner.component";
import { KeisyoPipe } from "./area/pipe/keisyoPipe";
import { PipeShowComponent } from "./area/pipe/pipeShow.component";
@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule ],
  declarations: [ 
    AppComponent,
    DefaultComponent,
    NgForComponent,
    NgClassComponent,
    NgIfComponent,
    AttrBind,
    NgModelChangeComponent,
    ViewChildComponent,ChildComponent,
    AtInput, AtInputChildComponent,
    AtOutput, AtOutputChildComponent,
    ElementRefComponent, ElementRefChildComponent,
    HostListnerComponent,
    KeisyoPipe,
    PipeShowComponent
    ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
