export class UpdateComicDto {
    _id: string
    id?: number
    title?: string
    description?: string
    publication?: Date
    thumbnail?: string
    pageCount?: number

    constructor(
        _id: string,
        id?: number,
        title?: string,
        description?: string,
        publication?: Date,
        thumbnail?: string,
        pageCount?: number,
    ) {
        this._id = _id;
        this.id = id;
        this.title = title;
        this.description = description;
        this.publication = publication;
        this.thumbnail = thumbnail;
        this.pageCount = pageCount
    }
}