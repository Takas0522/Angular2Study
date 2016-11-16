import { Pipe, PipeTransform } from "@angular/core";
@Pipe({ name: "TitleCasePipe" })
export class TitleCasePipe implements PipeTransform {
    transform(value: string) {
        if (value) {
            console.log(value.toUpperCase());
            return value.toUpperCase();
        }
    }
}
