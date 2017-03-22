import { FormGroup  } from '@angular/forms';
export interface ComponentInterface {
    fromErrors: any;
    validationMessages: any;
    isActionValidationCheck: boolean;
    buidForm();
    validatedErrorsACtion(errors: any);
}
