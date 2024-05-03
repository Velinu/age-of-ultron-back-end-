export class CreateComicDto {
    id?: number
    title: string
    description: string
    publication: Date
    thumbnail: string
    pageCount: number

    constructor(
        title: string,
        description: string,
        publication: Date,
        thumbnail: string,
        pageCount: number,
        id?: number
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.publication = publication;
        this.thumbnail = thumbnail;
        this.pageCount = pageCount
    }
}