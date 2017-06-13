import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { appRouter } from "./router-setting/app.routes"
import { AppComponent } from './app.component';
import { EmptyComponent } from './empty/empty.component';
import { ReactiveFormOne } from './reactive-forms/reactive-form-one.component';

@NgModule({
  declarations: [
    AppComponent,
    ReactiveFormOne,
    EmptyComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    appRouter
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    
  ]
})
export class AppModule { }
