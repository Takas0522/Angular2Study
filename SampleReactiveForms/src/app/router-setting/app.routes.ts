import { Routes, RouterModule } from "@angular/router"
import { EmptyComponent } from "../empty/empty.component";
import { ReactiveFormOne } from "../reactive-forms/reactive-form-one.component";

const routes: Routes = [
    { path: "empty", component: EmptyComponent },
    { path: "r1", component: ReactiveFormOne },
    { path: "**", component: EmptyComponent }
]

export const appRouter = [
    RouterModule.forRoot(routes)
];