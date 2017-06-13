import { Validators } from '@angular/forms';
import { ValidarionMessages } from '../base/validationmessage';

export const FIRST_NAME_CONTROL_KEYWORD = 'firstname';
export const FIRST_NAME_CONTROL_SHOW_NAME = '性';
export const FIRST_NAME_MAX_LENGTH = 10;

export const LAST_NAME_CONTROL_KEYWORD = 'lastname';
export const LAST_NAME_CONTROL_SHOW_NAME = '名';
export const LAST_NAME_MAX_LENGTH = 10;

export const FORM_SETTING = {
    [FIRST_NAME_CONTROL_KEYWORD]:['', 
        [
            Validators.required,
            Validators.maxLength(FIRST_NAME_MAX_LENGTH)
        ]
    ],
    [LAST_NAME_CONTROL_KEYWORD]:['', 
        [
            Validators.maxLength(LAST_NAME_MAX_LENGTH)
        ]
    ]
}

export const FORM_ERRORS = {
    [FIRST_NAME_CONTROL_KEYWORD]:'',
    [LAST_NAME_MAX_LENGTH]:''
}

const REQUIRED = 'required';
const MAXLEMGTH = 'maxlength';

export const VALIDATION_MESSAGES = {
    [FIRST_NAME_CONTROL_KEYWORD]: {
        [REQUIRED]: ValidarionMessages.getRequredMessage(FIRST_NAME_CONTROL_SHOW_NAME),
        [MAXLEMGTH]: ValidarionMessages.getMaxLengthMessage(FIRST_NAME_CONTROL_SHOW_NAME, FIRST_NAME_MAX_LENGTH)
    },
    [LAST_NAME_MAX_LENGTH]: {

        [MAXLEMGTH]: ValidarionMessages.getMaxLengthMessage(LAST_NAME_CONTROL_KEYWORD, LAST_NAME_MAX_LENGTH)
    }
}
