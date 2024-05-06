import { isDate, isEmail, isEmpty, isHexColor, isURL } from "validator";

export class ValidateFields {
    public validateEmail(email: string): boolean {
        if (typeof email !== 'string') { return false }
        return isEmail(email);
    }
}