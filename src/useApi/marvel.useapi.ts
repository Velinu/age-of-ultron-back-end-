import { Md5 } from "../utils/md5";

export class MarvelApi {
    private md5 = new Md5();

    private generateApi(path: string) {
        const ts = Number(new Date());
        const url =
            process.env.MARVEL_API!
            + path
            + '?ts='
            + ts
            + '&apikey='
            + process.env.MARVEL_PUBLIC_KEY!
            + '&hash='
            + this.md5.encrypt(ts + process.env.MARVEL_PRIVATE_KEY! + process.env.MARVEL_PUBLIC_KEY);
        return url
    }

    public async getEvent(id: number) {
        return fetch(this.generateApi(`events/${id}`))
            .then(async (result: any) => {
                const res = await result.json();
                return res.code === 200 ? res.data.results : null;
            })
            .catch((error) => {
                console.error(error);
                return null;
            })
    }
}