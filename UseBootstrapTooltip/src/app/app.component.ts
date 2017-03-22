import { Component, ElementRef, OnInit, ViewChild, Directive } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  private title = 'FormValidator & UsingBootstrap';
  private inputValue: InputValue;
  private inputForm: FormGroup;
  @ViewChild('useridtip') public userTooltip: NgbTooltip;
  private isValidationCheck = false;
  private formErrors = {
    'UserId': '',
    'password': ''
  };

  private validationMessages = {
    'UserId': {
      'required': 'Name is required.',
    },
    'password': {
      'required': 'Power is required.'
    }
  };

  onValueChanged(data?: any) {
      if (!this.inputForm) { return; }
      const form = this.inputForm;

      for (const field in this.formErrors) {
        if (this.formErrors.hasOwnProperty(field)) {
          this.formErrors[field] = '';
          const control = form.get(field);

          if (control && control.dirty && !control.valid && this.isValidationCheck) {
            const message = this.validationMessages[field];
            for (const key in control.errors) {
              if (control.errors.hasOwnProperty(key)) {
                this.formErrors[field] += message[key];
              }
            }
            if (this.formErrors[field]) {
              // エラー時処理 //
              console.log(this.formErrors[field]);
            }
          }
        }
      }
  }

  private buidForm() {
    this.inputForm = this._fb.group({
      'UserId': [ this.inputValue.UserId, [
          Validators.required,
        ]
      ],
      'password': [ this.inputValue.Password, [
          Validators.required
        ]
      ]
    });
    this.inputForm.valueChanges.subscribe(
      data => this.onValueChanged(data)
    );
    this.onValueChanged();
  }

  constructor(
    private _fb: FormBuilder
  ) {}

  ngOnInit() {
    this.inputValue = new InputValue();

    this.inputValue.UserId = '';
    this.inputValue.Password = '';
    this.isValidationCheck = false;
    this.buidForm();
  }

  private onSubmit() {
    this.isValidationCheck = true;
    this.onValueChanged();
  }
}

class InputValue {
  UserId: string;
  Password: string;
}
