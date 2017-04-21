import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { LoginUser } from './LoginUser'
import { LoginService } from './login.service'
import { LoginApi } from './login.api'

@Component({
    selector:'login-comp',
    templateUrl: './login.html',
    providers: [LoginService, LoginApi]
})
export class LoginComponent implements OnInit {

    get loginUser(): LoginUser {
        return this._loginUser;
    }
    private _loginUser: LoginUser  = {
        userId: '',
        password: ''
    };

    /* Validator */
    inputForm: FormGroup;
    formErrors: any = {
        'userId': '',
        'password': ''
    }
    validationMessage: any = {
        'userId': {
            'required': 'USERIDは必須だよ'
        },
        'password': {
            'required': 'PASSWORDは必須だよ'
        }
    }

    constructor(
        private _fb: FormBuilder,
        private _api: LoginApi,
        private _service: LoginService
    ) {}

    ngOnInit(){
        this.buidForm();
    }

    /** Formを組み立てます */
    buidForm() {
        this.inputForm = this._fb.group({
            'userId': [this.loginUser.userId, [
                Validators.required
            ]],
            'password': [this.loginUser.password, [
                Validators.required
            ]]
        });
        this.inputForm.valueChanges.subscribe(data => {
            this.onValueChange(data);
        });
        this.onValueChange();
    }

    /** Formのコントロールの値が変更された時に発生するイベント */
    onValueChange(data?: any) {
        if (!this.inputForm) { return; }
        const form = this.inputForm;
        for (const field in this.formErrors) {
            const control = form.get(field);
            if (control && control.dirty && control.invalid) {
                const message = this.validationMessage[field];
                for (const key in control.errors) {
                    this.formErrors[field] += message[key];
                }
            }
        } 
    }

    onSubmit() {
        this._api.loginAction(this.loginUser).subscribe(data =>{
            if (data.result) {
                //hogehoge
            } else  {
                this.errorMessage = 'ID/Passwordが一致しません';
            }
        });
    }

    private _errorMessage: string;
    get errorMessage() {
        return this._errorMessage;
    }
    set errorMessage(value: string) {
        this._errorMessage = value;
    }
}