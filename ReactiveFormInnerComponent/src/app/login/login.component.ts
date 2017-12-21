import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';

import * as setting from './form-settings';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  inputForm: FormGroup;
  formErrors: any = {};
  validationMessages: any = {};
  formSetting: any = {};

  get USER_ID_KEYWORD(): string {
    return setting.USER_ID_KEYWORD;
  }

  get PASSWORD_KEYWORD(): string {
    return setting.PASSWORD_KEYWORD;
  }

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formSettingsInit();
    this.buildForm();
  }

  formSettingsInit() {
    this.formErrors = setting.formErrors;
    this.validationMessages = setting.validationMessages;
    this.formSetting = setting.formSetting;
  }

  buildForm() {
    this.inputForm = this.fb.group(this.formSetting);
    this.inputForm.valueChanges.subscribe(data => {
      this.onValueChange(data);
    });
    this.onValueChange();
  }

  onValueChange(data?: any) {
    if (!this.inputForm) { return; }
    const form = this.inputForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        const control = form.get(field);
        this.errorSet(control, field);
      }
    }
  }

  errorSet(control: AbstractControl, field: string) {
    this.formErrors[field] = '';
    if (control && control.dirty && !control.valid) {
      const message = this.validationMessages[field];
      for (const key in control.errors) {
        if (control.errors.hasOwnProperty(key)) {
          const nowMes = <string>this.formErrors[field];
          const addMes = <string>message[key];
          if (!nowMes.match(addMes)) {
            this.formErrors[field] += message[key];
          }
        }
      }
    }
  }
}
