import {Pipe, PipeTransform} from "@angular/core";
@Pipe({name: 'keisyoPipe'})
export class KeisyoPipe implements PipeTransform {
    transform(value: string, type:KeisyoType){
        var keisyo: string;
        switch (type){
            case KeisyoType.chan:
                keisyo = "ちゃん";
                break;
            case KeisyoType.sama:
                keisyo = "さま";
                break;
            case KeisyoType.san:
                keisyo = "さん";
                break;
            case KeisyoType.yarou:
                keisyo= "野郎！";
                break;
            default:
                keisyo = "!?";
        }
        return value + keisyo;
    }
}
export enum KeisyoType{
    san = 1,
    sama,
    chan,
    yarou
}