import { UpdateComicSimpleDto } from "./update-comic-simple.dto";

export class UpdateComicFullDto {
    available?: Number
    comic?: Array<UpdateComicSimpleDto>
}