import { Id } from "../classes/id.class";
import { Creator } from "../interfaces/creator.interface";
import { Storie } from "../interfaces/stories.interface";
import { Md5 } from "../utils/md5";

export class MarvelApi {
    private md5 = new Md5();

    private generateApi(path: string, query?: string) {
        const ts = Number(new Date());
        const url = `${process.env.MARVEL_API!}${path}${query ? `?${query}&ts=` : '?ts'}${ts}&apikey=${process.env.MARVEL_PUBLIC_KEY!}&hash=${this.md5.encrypt(ts + process.env.MARVEL_PRIVATE_KEY! + process.env.MARVEL_PUBLIC_KEY)}`
        return url
    }

    public async getEvent(id: number) {
        return fetch(this.generateApi(`events/${id}`, 'limit=100'))
            .then(async (result: any) => {
                result = await result.json();
                if (result.code == 200) {
                    const [characters, stories, creators, series, comics] = await Promise.all([
                        fetch(this.generateApi(`events/${id}/characters`, 'limit=100')).then((res: any) => res.json()),
                        fetch(this.generateApi(`events/${id}/stories`, 'limit=100')).then((res: any) => res.json()),
                        fetch(this.generateApi(`events/${id}/creators`, 'limit=100')).then((res: any) => res.json()),
                        fetch(this.generateApi(`events/${id}/series`, 'limit=100')).then((res: any) => res.json()),
                        fetch(this.generateApi(`events/${id}/comics`, 'limit=100')).then((res: any) => res.json()),
                    ]);

                    let charactersArray: Array<Id> = [];
                    let storiesArray: Array<Id> = [];
                    let creatorsArray: Array<Id> = [];
                    let seriesArray: Array<Id> = [];
                    let comicsArray: Array<Id> = [];

                    characters.data.results.forEach((character: any) => {
                        charactersArray.push(new Id(parseInt(character.id)));
                    });

                    stories.data.results.forEach((storie: any) => {
                        storiesArray.push(new Id(parseInt(storie.id)));
                    });

                    creators.data.results.forEach((creator: any) => {
                        creatorsArray.push(new Id(parseInt(creator.id)));
                    });

                    series.data.results.forEach((serie: any) => {
                        seriesArray.push(new Id(parseInt(serie.id)));
                    });

                    comics.data.results.forEach((comic: any) => {
                        comicsArray.push(new Id(parseInt(comic.id)));
                    });

                    result.data.results[0].creators = creatorsArray;
                    result.data.results[0].characters = charactersArray;
                    result.data.results[0].stories = storiesArray;
                    result.data.results[0].series = seriesArray;
                    result.data.results[0].comics = comicsArray;

                    return result.data.results;
                }

                return null

            })
            .catch((error) => {
                console.error(error);
                return null;
            })
    }

    public async getStoriesByEvent(eventId: number) {
        try {
            return fetch(this.generateApi(`events/${eventId}/stories`, 'limit=100'))
                .then(async (result: any): Promise<Array<Storie>> => {
                    result = await result.json();
                    result.data.results.forEach((el: any) => {
                        let creatorsArray: Array<Id> = [];
                        if (el.creators.items) {
                            el.creators.items.forEach((el: any) => {
                                let url = el.resourceURI.split('/');
                                let id: string = url[url.length - 1];
                                creatorsArray.push(new Id(parseInt(id)));
                            })

                            el.creators = creatorsArray;
                        } else {
                            el.creators = []
                        }
                    });

                    result.data.results.forEach((el: any) => {
                        let charactersArray: Array<Id> = [];
                        if (el.characters.items) {
                            el.characters.items.forEach((el: any) => {
                                let url = el.resourceURI.split('/');
                                let id: string = url[url.length - 1];
                                charactersArray.push(new Id(parseInt(id)));
                            })

                            el.characters = charactersArray;
                        } else {
                            el.characters = []
                        }
                    });

                    result.data.results.forEach((el: any) => {
                        let seriesArray: Array<Id> = [];
                        if (el.series.items) {
                            el.series.items.forEach((el: any) => {
                                let url = el.resourceURI.split('/');
                                let id: string = url[url.length - 1];
                                seriesArray.push(new Id(parseInt(id)));
                            })

                            el.series = seriesArray;
                        } else {
                            el.series = []
                        }
                    });

                    result.data.results.forEach((el: any) => {
                        let comicsArray: Array<Id> = [];
                        if (el.comics.items) {
                            el.comics.items.forEach((el: any) => {
                                let url = el.resourceURI.split('/');
                                let id: string = url[url.length - 1];
                                comicsArray.push(new Id(parseInt(id)));
                            })

                            el.comics = comicsArray;
                        } else {
                            el.comics = []
                        }
                    });

                    result.data.results.forEach((el: any) => {
                        let eventsArray: Array<Id> = [];
                        if (el.events.items) {
                            el.events.items.forEach((el: any) => {
                                let url = el.resourceURI.split('/');
                                let id: string = url[url.length - 1];
                                eventsArray.push(new Id(parseInt(id)));
                            })

                            el.events = eventsArray;
                        } else {
                            el.events = []
                        }
                    });

                    return result.data.results;
                })
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    public async getCreatorsByEvent(eventId: number) {
        try {
            return fetch(this.generateApi(`events/${eventId}/creators`, 'limit=100'))
                .then(async (result: any): Promise<Creator[]> => {
                    const res = await result.json();
                    return res.code === 200 ? res.data.results : null;
                })
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    public async getCreatorsByStorie(storieId: number) {
        try {
            return fetch(this.generateApi(`stories/${storieId}/creators`, 'limit=100'))
                .then(async (result: any): Promise<Creator[]> => {
                    const res = await result.json();
                    return res.code === 200 ? res.data.results : null;
                })
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}