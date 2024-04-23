import { GenericRepository } from "./generic/generic-repository.repository";
import storieModel from '../schemas/stories.schema'
import { Creator } from "../interfaces/creator.interface";
import { StoriesDocument } from "../schemas/stories.schema";
import { Storie } from "../interfaces/stories.interface";

export class StorieRepository extends GenericRepository<StoriesDocument> {
    constructor() {
        super(storieModel);
    }

    async findByStorieId(storieId: number): Promise<Storie | null> {
        return this.findOne({ id: storieId })
            .then((res) => {
                return res;
            })
            .catch(() => {
                return null;
            })
    }
}