import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { BaseComponent } from "../base/base.component";
import * as validSettings from "./validation-settings";

@Component({
    templateUrl: "./reactive-firm-one.html",
})
export class ReactiveFormOne extends BaseComponent implements OnInit {
    
    formErrors = validSettings.FORM_ERRORS;
    validationMessage = validSettings.VALIDATION_MESSAGES;

    constructor(
        private _fb: FormBuilder
    ){
        super();
    }

    get USER_ID_CONTROL_KEYWORD(): string{
        return validSettings.USER_ID_CONTROL_KEYWORD;
    }
    get USER_NAME_CONTROL_KEYWORD(): string{
        return validSettings.USER_NAME_CONTROL_KEYWORD;
    }
    get PASSWORD_CONTROL_KEYWORD(): string{
        return validSettings.PASSWORD_CONTROL_KEYWORD;
    }

    ngOnInit(){
        this.buildForms();
    }

    buildForms() {
        this.inputForm = this._fb.group(validSettings.FORM_SETTING);
        super.buildForms();
    }
}