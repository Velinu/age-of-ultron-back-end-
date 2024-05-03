import { ComicClass } from "./comic.class"

export class ComicFullClass {
    available: Number
    comic: Array<ComicClass>

    constructor(
        available: Number,
        comic: Array<ComicClass>
    ) {
        this.available = available;
        this.comic = comic;
    }
}