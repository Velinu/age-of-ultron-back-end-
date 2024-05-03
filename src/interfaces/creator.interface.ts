import { ComicClass } from "../classes/comic.class"

export interface CreatorInterface {
    _id: string
    id: number
    fullName: String
    comics?: {
        available: Number
        comic?: Array<ComicClass>
    }
    series?: number
    stories?: number
    events?: number
    detailUrl: String
    createdAt: Date
    updatedAt: Date
}