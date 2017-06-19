import { Injectable } from "@angular/core";
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { BaseComponent } from "../base/base.component";
@Injectable()
export class InputPageCanDeactivatedGuard<T extends BaseComponent> implements CanDeactivate<T>{
    canDeactivate(
        component: T,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return component.canDeActivateInputPage();
    }
}
