import { ComicFullClass } from "../../classes/comic-full.class"

export class CreateCreatorDto {
    id?: number
    fullName: String
    comics: ComicFullClass
    series: number
    stories: number
    events: number
    detailUrl: String

    constructor(
        fullName: String,
        series: number,
        stories: number,
        events: number,
        detailUrl: String,
        comics: ComicFullClass,
        id?: number,
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