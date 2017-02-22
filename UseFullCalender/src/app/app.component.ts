import { Component, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { CalenderComponent } from './calender/calender.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(CalenderComponent) private _calenderComp: CalenderComponent;
  title = 'app works!';
  private updateConstEvent(){
    this._calenderComp.onUpdateEventData(this.constEventData);
  }
  private constEventData: FC.EventObject[] = [
    {
      title: "終日イベント１！",
      start: moment(new Date("2017/2/21"))
    },
    {
      title: "Pointイベント１",
      start: moment(new Date("2017/2/21 10:00:00"))
    },
    {
      title: "Pointイベント2",
      start: moment(new Date("2017/2/22 09:00:00"))
    },
    {
      title: "範囲イベント1",
      start: moment(new Date("2017/2/21 12:00:00")),
      end: moment(new Date("2017/2/21 12:45:00"))
    },
    {
      title: "範囲イベント2",
      start: moment(new Date("2017/2/23 12:40:00")),
      end: moment(new Date("2017/2/23 18:00:00"))
    },
  ]
}
