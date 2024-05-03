import { ComicFullClass } from "./comic-full.class"
import { ComicClass } from "./comic.class"

export class CreatorClass {
    id: number
    fullName: String
    comics: ComicFullClass
    series: number
    stories: number
    events: number
    detailUrl: String

    constructor(
        id: number,
        fullName: String,
        series: number,
        stories: number,
        events: number,
        detailUrl: String,
        comics: ComicFullClass
    ) {
        this.id = id;
        this.fullName = fullName;
        this.series = series;
        this.stories = stories;
        this.events = events;
        this.detailUrl = detailUrl;
        this.comics = comics;
    }
}