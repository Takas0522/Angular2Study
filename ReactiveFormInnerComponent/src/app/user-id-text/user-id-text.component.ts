import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import * as setting from '../login/form-settings';

@Component({
  selector: 'app-user-id-text',
  templateUrl: './user-id-text.component.html',
  styleUrls: ['./user-id-text.component.css']
})
export class UserIdTextComponent implements OnInit {

  @Input()
  fg: FormGroup;

  get USER_ID_KEYWORD(): string {
    return setting.USER_ID_KEYWORD;
  }

  constructor() { }

  ngOnInit() {
  }

}
