import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from "./area/default/default.component";
import { NgForComponent } from "./area/ngFor/ngFor.component";
import { NgClassComponent } from "./area/ngClass/ngClass.component";
import { NgIfComponent } from "./area/ngif/ngif.component";
import { AttrBind } from "./area/attrBind/attrBind.component";
import { NgModelChangeComponent } from "./area/ngModelChange/ngModelChange.component";
import { ViewChildComponent } from "./area/viewChild/viewChild.component";
import { AtInput } from "./area/atInput/atInput.component";
import { AtOutput } from "./area/atOutput/atOutput.component";
import { ElementRefComponent } from "./area/elementRef/elementRef.component";
import {HostListnerComponent } from "./area/hostListner/hostListner.component";
import { PipeShowComponent } from "./area/pipe/pipeShow.component";

const routes: Routes = [
  { path: '', redirectTo: '/default', pathMatch: 'full' },
  { path: 'default',  component: DefaultComponent },
  { path: 'ngfor',  component: NgForComponent },
  { path: 'ngclass',  component: NgClassComponent },
  { path: 'attrbind',  component: AttrBind },
  { path: 'ngmodelchange',  component: NgModelChangeComponent },
  { path: 'viewchild',  component: ViewChildComponent },
  { path: 'atinput', component: AtInput},
  { path: 'atoutput', component: AtOutput},
  { path: 'elementref', component: ElementRefComponent},
  { path: 'hostlistner', component: HostListnerComponent},
  { path: 'showpipe', component: PipeShowComponent}
//  { path: 'ngif',  component: NgIfComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}