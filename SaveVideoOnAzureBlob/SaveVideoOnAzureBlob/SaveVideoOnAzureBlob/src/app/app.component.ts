import { Component, Inject, OnInit, ViewChildren, QueryList } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { WebApiAction } from './webapi-action';
import { MyVideoComponent } from "./my-video/my-video.component"
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    constructor(
        @Inject(APP_BASE_HREF) private baseHref: string,
        private _webapi: WebApiAction
    ) { }
    ngOnInit() {
        this._webapi.getFileLists().subscribe(data => {
            this.fileLists = data;
        });
    }
    private angularPng: string = this.baseHref + "public/images/angular.png";

    private fileLists: string[];

    private onChangeInput(el: any) {
        let file = el.target.files[0];
        let formData = new FormData();
        formData.append('uploadFile', file, file.name);
        this._webapi.putUploadFile(formData).subscribe(data => {
            console.log(data);
        });
    }
    @ViewChildren(MyVideoComponent) videoComponents: QueryList<MyVideoComponent>;

    onVideoRequestPlayback(targetVideo: MyVideoComponent) {
        this.videoComponents.forEach(video => video.pause());
        targetVideo.play();
    }
}