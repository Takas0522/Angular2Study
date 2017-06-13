import { FormGroup, FormBuilder } from '@angular/forms'

export class BaseComponent {
    inputForm: FormGroup;
    formErrors: any;
    validationMessage: any;

    buildForms() {
        this.inputForm.valueChanges.subscribe(data => {
            this.onValueChange(data);
        });
    }

    onValueChange(data?: any) {
        const form = this.inputForm;
        for(const field in this.formErrors){
            /* Initialize form's Errors */
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessage[field];
                for (const key in control.errors){
                    this.formErrors[field] += messages[key];
                }
                this.emitErrorAction(field);
            }
            if (control && control.dirty && control.valid) {
                this.emitNotErrorAction(field);
            }
        }
    }

    emitErrorAction(field: any) {
        /* エラー発生時処理、継承先で実装 */
    }

    emitNotErrorAction(field: any){
        /* エラー未発生時処理、継承先で実装 */
    }
}
