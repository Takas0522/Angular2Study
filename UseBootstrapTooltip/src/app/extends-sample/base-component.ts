import { Validators, FormGroup, FormBuilder  } from '@angular/forms';
export class BaseComponent {
    /* Validator処理 */
    fromErrors: any = {};
    validationMessages: any = {};
    inputForm: FormGroup;
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
                        console.log(this.fromErrors[field]);
                    }
                }
            }
        }
    }
}
