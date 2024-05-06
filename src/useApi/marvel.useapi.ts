import { ComicClass } from "../classes/comic.class";
import { CreatorClass } from "../classes/creator.class";
import { Md5 } from "../utils/md5";
import { ComicFullClass } from "../classes/comic-full.class";
import { ComicsClass } from "../classes/comics.class";

export class MarvelApi {
    private md5 = new Md5();

    private generateApi(path: string, query?: string) {
        const ts = Number(new Date());
        const url = `${process.env.MARVEL_API!}${path}${query ? `?${query}&ts=` : '?ts'}${ts}&apikey=${process.env.MARVEL_PUBLIC_KEY!}&hash=${this.md5.encrypt(ts + process.env.MARVEL_PRIVATE_KEY! + process.env.MARVEL_PUBLIC_KEY)}`
        return url
    }

    public async getCreatorsByEvent(eventId: number) {
        try {
            return await fetch(this.generateApi(`events/${eventId}/creators`, 'limit=100'))
                .then(async (result: any): Promise<CreatorClass[] | null> => {
                    result = await result.json();
                    if (result.code === 200) {
                        const data = result.data.results;

                        const creatorsArray = new Array<CreatorClass>

                        for (const creator of data) {
                            const comicsArray = new Array<ComicClass>
                            let detailUrl = '';

                            if (creator.urls.length > 0) {
                                for (let j = 0; creator.urls.length - 1; j++) {
                                    if (creator.urls[j].type) {
                                        if (creator.urls[j].type == 'datail') {
                                            detailUrl = data.urls[j].url;
                                        }
                                    }
                                };
                            }

                            creator.comics.items.forEach((el: any) => {
                                let url = el.resourceURI.split('/');
                                let id: string = url[url.length - 1];
                                comicsArray.push(
                                    new ComicClass(
                                        parseInt(id),
                                        el.name
                                    )
                                )
                            })

                            creatorsArray.push(
                                new CreatorClass(
                                    creator.id,
                                    creator.fullName,
                                    creator.series.available,
                                    creator.stories.available,
                                    creator.events.available,
                                    detailUrl,
                                    new ComicFullClass(creator.comics.available, comicsArray)
                                )
                            )
                        }

                        return creatorsArray;
                    }
                    return null;
                })
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getComicsByEvent(eventId: number) {
        try {
            return await fetch(this.generateApi(`events/${eventId}/comics`, 'limit=100'))
                .then(async (result: any): Promise<ComicsClass[] | null> => {
                    result = await result.json();
                    if (result.code == 200) {
                        const data = result.data.results;
                        const comicsArray = new Array<ComicsClass>;

                        for (const comic of data) {

                            comicsArray.push(
                                new ComicsClass(
                                    comic.id,
                                    comic.title,
                                    comic.description == '' ? 'none' : comic.description,
                                    comic.dates[0].date,
                                    comic.thumbnail.path,
                                    comic.pageCount,
                                )
                            )
                        }

                        return comicsArray;
                    }


                    return null
                })
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    public async getCharactersByEvent(id: number) {
        return fetch(this.generateApi(`events/${id}/characters`, 'limit=100'))
            .then(async (result: any) => {
                const res = await result.json();
                return res.code === 200 ? res.data.results : null;
            })
            .catch((error) => {
                console.error(error);
                return null;
            })
    }

    public async getComicsByCharacter(id: number) {
        return fetch(this.generateApi(`characters/${id}/comics`, 'limit=100'))
            .then(async (result: any) => {
                const res = await result.json();
                return res.code === 200 ? res.data.results : null;
            })
            .catch((error) => {
                console.error(error)
                return null
            })
    }

    public async getCharacterById(id: number) {
        return fetch(this.generateApi(`characters/${id}`, 'limit=100'))
            .then(async (result: any) => {
                const res = await result.json();
                return res.code === 200 ? res.data.results : null
            })
            .catch((error) => {
                console.error(error)
                return null
            })
    }

    public async getAllCharacters() {
        return fetch(this.generateApi(`characters`, 'limit=100'))
            .then(async (result: any) => {
                const res = await result.json();
                return res.code === 200 ? res.data.results : null
            })
            .catch((error) => {
                console.error(error)
                return null
            })
    }


}