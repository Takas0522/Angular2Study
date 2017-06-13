import { Validators } from '@angular/forms';
import { ValidarionMessages } from '../base/validationmessage';

export const USER_NAME_CONTROL_KEYWORD = 'username';
export const USER_NAME_CONTROL_SHOW_NAME = 'ユーザー名';
export const USER_NAME_MAX_LENGTH = 20;

export const USER_ID_CONTROL_KEYWORD = 'userid';
export const USER_ID_CONTROL_SHOW_NAME = 'ユーザID';
export const USER_ID_MAX_LENGTH = 10;

export const PASSWORD_CONTROL_KEYWORD = 'password';
export const PASSWOED_CONTROL_SHOW_NAME = 'パスワード';
export const PASSWORD_MAX_LENGTH = 8;

export const FORM_SETTING = {
    [USER_NAME_CONTROL_KEYWORD]:['', 
        [
            Validators.maxLength(USER_NAME_MAX_LENGTH)
        ]
    ],
    [USER_ID_CONTROL_KEYWORD]:['', 
        [
            Validators.required,
            Validators.maxLength(USER_ID_MAX_LENGTH)
        ]
    ],
    [PASSWORD_CONTROL_KEYWORD]:['', 
        [
            Validators.required,
            Validators.maxLength(PASSWORD_MAX_LENGTH)
        ]
    ]
}

export const FORM_ERRORS = {
    [USER_NAME_CONTROL_KEYWORD]:'',
    [USER_ID_CONTROL_KEYWORD]:'',
    [PASSWORD_CONTROL_KEYWORD]:''
}

const REQUIRED = 'required';
const MAXLEMGTH = 'maxlength';

export const VALIDATION_MESSAGES = {
    [USER_NAME_CONTROL_KEYWORD]: {
        [MAXLEMGTH]: ValidarionMessages.getMaxLengthMessage(USER_NAME_CONTROL_SHOW_NAME, USER_NAME_MAX_LENGTH)
    },
    [USER_ID_CONTROL_KEYWORD]: {
        [REQUIRED]: ValidarionMessages.getRequredMessage(USER_ID_CONTROL_SHOW_NAME),
        [MAXLEMGTH]: ValidarionMessages.getMaxLengthMessage(USER_ID_CONTROL_SHOW_NAME, USER_ID_MAX_LENGTH)
    },
    [PASSWORD_CONTROL_KEYWORD]: {
        [REQUIRED]: ValidarionMessages.getRequredMessage(PASSWOED_CONTROL_SHOW_NAME),
        [MAXLEMGTH]: ValidarionMessages.getMaxLengthMessage(PASSWOED_CONTROL_SHOW_NAME, PASSWORD_MAX_LENGTH)
    }
}
