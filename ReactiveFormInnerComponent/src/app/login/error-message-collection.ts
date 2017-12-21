export const requiredErrorMessage = keyword => `${keyword}を入力してください。`;
export const lengthOverErrorMessage = (keyword, maxLength) => `"${keyword}"は ${maxLength} 桁以内で入力してください。`;
export const lengthShortageErrorMessage = (keyword, minLength) => `"${keyword}"は ${minLength} 桁以上で入力してください。`;
export const emailPatternErrorMessage = (keyword) => `"${keyword}"は メールアドレスの形式ではありません。`;

export const requiredCheck = 'required';
export const minLengthCheck = 'minlength';
export const maxLengthCheck = 'maxlength';
export const emailCheck = 'email';
