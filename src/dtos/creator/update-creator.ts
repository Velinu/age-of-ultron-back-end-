import { UpdateComicFullDto } from "./update-comic-full.dto"


export class UpdateCreatorDto {
    _id: string
    id?: number
    fullName?: String
    comics?: UpdateComicFullDto
    series?: Number
    stories?: Number
    events?: Number
    detail?: String

    constructor(_id: string) {
        this._id = _id;
    }
}