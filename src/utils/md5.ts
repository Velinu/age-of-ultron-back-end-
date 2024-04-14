import md5 from "md5";

export class Md5 {
    public encrypt(message: string) {
        return md5(message);
    }
}