import { Component, Inject, OnInit } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { Http } from '@angular/http';
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    constructor(
        @Inject(APP_BASE_HREF) private baseHref: string,
        private http: Http
    ) { }
    ngOnInit() {
        console.log(this.baseHref);
        this.http.get(this.baseHref + '/api/SampleApi').map(res => {
            console.log(res);
        });
    }
    private angularPng: string = "public/images/angular.png";
}
