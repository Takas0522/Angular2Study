import { Component, Output, ViewChild, Input, HostListener, EventEmitter, ElementRef } from "@angular/core";
@Component({
    selector: 'my-video',
    templateUrl: './my-video.html'
})
export class MyVideoComponent {
    @Output() requestPlayback: EventEmitter<MyVideoComponent> = new EventEmitter<MyVideoComponent>();
    @ViewChild('video') videoElement: ElementRef;
    @Input() src: string;

    @HostListener('click', ['$event']) onClick(event: Event) {
        if (this.videoElement.nativeElement.paused) {
            this.requestPlayback.emit(this);
        }
        event.preventDefault();
    }

    pause() {
        this.videoElement.nativeElement.pause();
    }

    play() {
        this.videoElement.nativeElement.play();
    }
}