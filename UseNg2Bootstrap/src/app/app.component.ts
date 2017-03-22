import { Component, ViewChild } from '@angular/core';

import { TooltipDirective } from 'ng2-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Using "ng2-bootstrap"';
  @ViewChild('pop') p: TooltipDirective;
  private onClickButton() {
    this.p.show();
  }
}
