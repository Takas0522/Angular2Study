import { Routes, RouterModule } from "@angular/router"
import { EmptyComponent } from "../empty/empty.component";
import { ReactiveFormOne } from "../reactive-forms-one/reactive-form-one.component";
import { ReactiveFormTwo } from "../reactive-forms-two/reactive-form-two.component";
import { InputPageCanDeactivatedGuard } from "./inputpage-can-deactivated-guard"

const routes: Routes = [
    { path: "empty", component: EmptyComponent },
    { path: "r1", component: ReactiveFormOne, canDeactivate: [InputPageCanDeactivatedGuard] },
    { path: "r2", component: ReactiveFormTwo, canDeactivate: [InputPageCanDeactivatedGuard] },
    { path: "**", component: EmptyComponent }
]

export const appRouter = [
    RouterModule.forRoot(routes)
];

export const activateGuardProvider = [
    InputPageCanDeactivatedGuard
];