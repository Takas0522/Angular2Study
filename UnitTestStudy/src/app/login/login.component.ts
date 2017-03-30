import { Component, OnInit } from '@angular/core';

@Component({
    selector:'login-comp',
    templateUrl: './login.html'
})
export class LoginComponent implements OnInit {
    
    userId: string = '';

    ngOnInit(){}

    formErrors: any = {
        'userId': '',
        'password': ''
    };

    private _errorMessage: string;
    get errorMessage() {
        return this._errorMessage;
    }
    set errorMessage(value: string) {
        this._errorMessage = value;
    }
}