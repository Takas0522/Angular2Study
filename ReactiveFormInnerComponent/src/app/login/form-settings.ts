import { Validators } from '@angular/forms';

import * as errSet from './error-message-collection';

export const USER_ID_KEYWORD = 'userid';
export const USER_ID_CONTROL_NAME = 'ID';

export const PASSWORD_KEYWORD = 'password';
export const PASSWORD_CONTROL_NAME = 'パスワード';

export const formErrors: any = {
    [USER_ID_KEYWORD]: '',
    [PASSWORD_KEYWORD]: '',
};

export const validationMessages: any = {
    [USER_ID_KEYWORD]: {
        [errSet.requiredCheck]: errSet.requiredErrorMessage(USER_ID_CONTROL_NAME)
    },
    [PASSWORD_KEYWORD]: {
        [errSet.requiredCheck]: errSet.requiredErrorMessage(PASSWORD_CONTROL_NAME),
    },
};


export const formSetting: any = {
    [USER_ID_KEYWORD]: ['', [
        Validators.required
    ]],
    [PASSWORD_KEYWORD]: ['', [
        Validators.required
    ]]
};
