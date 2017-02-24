import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule, JsonpModule, Http  } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { WebApiAction } from './webapi-action';
import { AppComponent } from './app.component';
import { MyVideoComponent } from './my-video/my-video.component';
@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule 
    ],
    declarations: [
        AppComponent,
        MyVideoComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        { provide: APP_BASE_HREF, useValue: window['_app_base'] || '/' },
        WebApiAction
    ]
})
export class AppModule { }
