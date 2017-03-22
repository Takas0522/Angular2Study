import { Validators, FormGroup, FormBuilder  } from '@angular/forms';

import { ComponentInterface } from './interface-component';
export class BaseComponent implements ComponentInterface {
    /* Validator処理 */
    fromErrors: any = {};
    validationMessages: any = {};
    inputForm: FormGroup;
    isActionValidationCheck = false;
    buidForm() {
        this.inputForm.valueChanges.subscribe( data => {
            this.onValueChanged(data);
        });
        this.onValueChanged();
    }

    onValueChanged(data?: any) {
        if (!this.inputForm) { return; }
        const form = this.inputForm;

        for (const field in this.fromErrors) {
            if (this.fromErrors.hasOwnProperty(field)) {
                this.fromErrors[field] = '';
                const control = form.get(field);
                if (control && control.dirty && !control.valid) {
                    const message = this.validationMessages[field];
                    for (const key in control.errors) {
                        if (control.errors.hasOwnProperty(key)) {
                            this.fromErrors[field] += message[key];
                        }
                    }
                    if (this.fromErrors[field]) {
                        this.validatedErrorsAction(this.fromErrors[field]);
                    }
                }
            }
        }
    }

    validatedErrorsAction(errors: any) {
        /* 継承先のコンポーネントで実装してくださいな */
    }
}
