import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MdInputModule, MdButtonModule } from '@angular/material';

import { appRouter, activateGuardProvider } from "./router-setting/app.routes"
import { AppComponent } from './app.component';
import { EmptyComponent } from './empty/empty.component';
import { ReactiveFormOne } from './reactive-forms-one/reactive-form-one.component';
import { ReactiveFormTwo } from './reactive-forms-two/reactive-form-two.component';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    ReactiveFormOne,
    ReactiveFormTwo,
    EmptyComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    MdInputModule,
    MdButtonModule,
    BrowserAnimationsModule,
    appRouter
  ],
  providers: [
    activateGuardProvider
  ],
  bootstrap: [
    AppComponent,
    
  ]
})
export class AppModule { }
