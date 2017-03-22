import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder  } from '@angular/forms';

import { BaseComponent } from './base-component';
import { ComponentInterface } from './interface-component'

@Component({
    selector: 'extends-sample',
    templateUrl: './extends-sample.html'
})
export class ExtendsSampleComponent extends BaseComponent implements OnInit, ComponentInterface {
    /* コンストラクタ */
    constructor(
        private _fb: FormBuilder
    ) {
        super();
    }
    isActionValidationCheck: boolean = false;
    /* Validator処理 */
    fromErrors: any = {
        'userid': '',
        'password': ''
    };

    validationMessages: any = {
        'userid': {
            'required': 'userid is requred'
        },
        'password': {
            'required': 'password is requred'
        }
    };

    buidForm() {
        this.inputForm = this._fb.group({
            'userid': [this.userEntry.userid, [
                Validators.required
            ]],
            'password': [this.userEntry.password, [
                Validators.required
            ]]
        });
        super.buidForm();
    }

    /* Component変数 */
    private userEntry: UserEntry;
    private readonly initUserEntry: UserEntry = {
        userid: '',
        password: ''
    };

    /* 初期化処理 */
    ngOnInit() {
        this.userEntry = this.initUserEntry;
        this.buidForm();
    }

    /* Validationエラー時処理を実装 */
    validatedErrorsAction(errors: any) {
        console.log(errors);
    }
    /* SUBMIT */
    private onSubmit() {
        console.log('submit');
    }
}

class UserEntry {
    userid: string;
    password: string;
}
