import { GenericRepository } from "./generic/generic-repository.repository";
import comicModel from '../schemas/comic.schema'
import { ComicDocument } from "../schemas/comic.schema";
import { ComicInterface } from "../interfaces/comic.interface";

export class ComicRepository extends GenericRepository<ComicDocument> {
    constructor() {
        super(comicModel);
    }

    async findByComicId(comicId: number): Promise<ComicInterface | null> {
        return this.findOne({ id: comicId })
            .then((res) => {
                return res;
            })
            .catch(() => {
                return null;
            })
    }

    async findAllComics(): Promise<ComicInterface[] | null> {
        return this.find({})
            .then((res) => {
                return res
            })
            .catch(() => {
                return null;
            })
    }

    async findComicByIds(id: string): Promise<ComicInterface | null> {
        if (isNaN(Number(id))) {
            return this.findOne({ _id: id })
                .then((res) => {
                    return res;
                })
                .catch(() => {
                    return null;
                })
        } else {
            return await this.findByComicId(parseInt(id));
        }

    }

    async getTitleOfComics() {
        return this.find({}, { title: 1, _id: 0 })
            .then((res) => {
                return res
            })
            .catch(() => {
                return null
            })
    }
}