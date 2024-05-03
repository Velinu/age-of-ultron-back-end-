export class CreateComicSimpleDto {
    id?: Number
    name: String
    constructor(name: String, id?: Number) {
        this.id = id;
        this.name = name;
    }
}
