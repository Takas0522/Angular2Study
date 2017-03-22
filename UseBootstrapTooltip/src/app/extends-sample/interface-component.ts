export interface ComponentInterface {
    fromErrors: any;
    validationMessages: any;
    isActionValidationCheck: boolean;
    buidForm();
    validatedErrorsAction(errors: any);
}
