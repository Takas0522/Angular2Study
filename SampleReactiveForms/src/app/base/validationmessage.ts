const REQUIRED_MESSAGE = '@1@は必須項目です。';
const MAXLENGTH_MESSAGE = '@1@は@2@文字以内で入力して下さい。';


export class ValidarionMessages {
    static getRequredMessage(field: string): string {
        return REQUIRED_MESSAGE.replace(/@1@/g, field);
    }

    static getMaxLengthMessage(field: string, maxlength: number): string {
        let retMessage = MAXLENGTH_MESSAGE.replace(/@1@/g, field);
        retMessage = retMessage.replace(/@2@/, maxlength.toString());
        return retMessage;
    }
}