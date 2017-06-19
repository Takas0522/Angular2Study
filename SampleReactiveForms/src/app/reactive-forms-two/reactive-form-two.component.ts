import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { BaseComponent } from "../base/base.component";
import * as validSettings from "./validation-settings";

@Component({
    templateUrl: "./reactive-form-two.html",
})
export class ReactiveFormTwo extends BaseComponent implements OnInit {
    
    formErrors = validSettings.FORM_ERRORS;
    validationMessage = validSettings.VALIDATION_MESSAGES;

    constructor(
        private _fb: FormBuilder,
        private _router: Router
    ){
        super();
    }

    get FIRST_NAME_CONTROL_KEYWORD(): string{
        return validSettings.FIRST_NAME_CONTROL_KEYWORD;
    }
    get FIRST_NAME_CONTROL_SHOW_NAME(): string{
        return validSettings.FIRST_NAME_CONTROL_SHOW_NAME;
    }
    get LAST_NAME_CONTROL_KEYWORD(): string{
        return validSettings.LAST_NAME_CONTROL_KEYWORD;
    }
    get LAST_NAME_CONTROL_SHOW_NAME(): string{
        return validSettings.LAST_NAME_CONTROL_SHOW_NAME;
    }

    ngOnInit(){
        this.buildForms();
    }

    buildForms() {
        this.inputForm = this._fb.group(validSettings.FORM_SETTING);
        super.buildForms();
    }

    onSubmit() {
        this.allControlReCheck();
        if (this.inputForm.invalid) {
            alert('えらーあるよ！')
        } else {
            this._router.navigate(["empty"]);
        }
    }
}