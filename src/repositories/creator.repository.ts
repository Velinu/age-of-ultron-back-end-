import { GenericRepository } from "./generic/generic-repository.repository";
import creatorModel from '../schemas/creators.schema'
import { CreatorDocument } from "../schemas/creators.schema";
import { Creator } from "../interfaces/creator.interface";

export class CreatorRepository extends GenericRepository<CreatorDocument> {
    constructor() {
        super(creatorModel);
    }

    async findByCreatorId(creatorId: number): Promise<Creator | null> {
        return this.findOne({ id: creatorId })
            .then((res) => {
                return res;
            })
            .catch(() => {
                return null;
            })
    }
}