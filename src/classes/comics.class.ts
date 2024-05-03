export class ComicsClass {
    id: number
    title: string
    description: string
    publication: Date
    thumbnail: string
    pageCount: number

    constructor(
        id: number,
        title: string,
        description: string,
        publication: Date,
        thumbnail: string,
        pageCount: number,
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.publication = publication;
        this.thumbnail = thumbnail;
        this.pageCount = pageCount
    }
}