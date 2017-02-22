import {Component, AfterViewInit, ElementRef} from '@angular/core';
import * as moment from 'moment';
import * as jQuery from 'jquery';
import 'fullcalendar';
@Component({
    template: '<ng-content></ng-content>',
    selector: 'app-fullcalendar'
})
export class CalenderComponent implements AfterViewInit {
    calendarElement: JQuery;
    constructor(
        private elementRef: ElementRef
    ) {}
    ngAfterViewInit() {
        this.calendarElement = jQuery(this.elementRef.nativeElement);
        this.calendarElement.fullCalendar({
            allDayText: '終日',
            editable: true,
            defaultView: 'agendaWeek',
            selectable: true,
            selectHelper: true,
            slotDuration: moment.duration(15, 'minutes'),
            slotLabelFormat : 'H:mm',
            buttonText: {
                today: '今日'
            },
            monthNames: ['１月', '２月', '３月', '４月', '５月', '６月', '７月', '８月', '９月', '１０月', '１１月', '１２月'],
            dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
            dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
            views: {
                month: {
                    columnFormat: 'ddd'
                },
                week: {
                    columnFormat: 'D[(]ddd[)]'
                },
                day: {
                    columnFormat: 'D[(]ddd[)]'
                }
            },
            select: this.onSelectFunction,
            eventDragStop: this.onDropFunction,
            eventResize: this.onReSizeFunction,
            eventRender: this.addEventRender
        });
    }
    onUpdateEventData(eventsData: FC.EventObject[]){
        this.calendarElement.fullCalendar( 'removeEvents' );
        this.calendarElement.fullCalendar( 'renderEvents', eventsData, true);
        this.calendarElement.fullCalendar( 'refetchEvents' );
    }

    private addEventRender = function(event: FC.EventObject, element: any){
        element.bind('dblclick', () => {
            alert('onDoubleClickEbent');
            console.log(event);
        });
    }
    private onSelectFunction = function(start, end){
        let eventTitle = prompt('予定の名称を入力せよ！！');
        let eventData: FC.EventObject = {
            start: start,
            end: end,
            title: eventTitle
        };
        this.calendarElement.fullCalendar('renderEvent', eventData, true);
        this.calendarElement.fullCalendar('unselect');
        this.runDatabaseUpdate(eventData);
    }.bind(this);

    private onDropFunction = function(event: FC.EventObject){
        console.log('Drop!');
        console.log(event);
        this.runDatabaseUpdate(event);
    }.bind(this);

    private onReSizeFunction = function(event: FC.EventObject){
        console.log('ReSize!');
        console.log(event);
        this.runDatabaseUpdate(event);
    }.bind(this);

    private runDatabaseUpdate(data: FC.EventObject){
        alert('DBへ更新を行う処理を実行するよ！');
        console.log(data);
    }
}
