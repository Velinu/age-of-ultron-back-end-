import { CreateComicSimpleDto } from "./create-comic-simple";


export class CreateComicFullDto {
    available?: Number
    comic?: Array<CreateComicSimpleDto>

    constructor(
        comic: Array<CreateComicSimpleDto>
    ) {
        this.comic = comic;
    }
}