import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule, JsonpModule  } from '@angular/http';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { WebApi } from './common/webapi';
import { CsvExportComponent } from './csvexport/csvexport.component';
@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule 
    ],
    declarations: [
        AppComponent,
        CsvExportComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        { provide: APP_BASE_HREF, useValue: window['_app_base'] || '/' },
        WebApi
    ]
})
export class AppModule { }
