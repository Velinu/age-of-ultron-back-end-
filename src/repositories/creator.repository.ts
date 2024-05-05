import { GenericRepository } from "./generic/generic-repository.repository";
import creatorModel from '../schemas/creator.schema'
import { CreatorDocument } from "../schemas/creator.schema";
import { CreatorInterface } from "../interfaces/creator.interface";

export class CreatorRepository extends GenericRepository<CreatorDocument> {
    constructor() {
        super(creatorModel);
    }

    async findByCreatorId(id: number): Promise<CreatorInterface | null> {
        return this.findOne({ id: id })
            .then((res) => {
                return res;
            })
            .catch(() => {
                return null;
            })
    }

    async findByCreatorIds(id: string): Promise<CreatorInterface | null> {
        if (isNaN(Number(id))) {
            return this.findOne({ _id: id })
                .then((res) => {
                    return res;
                })
                .catch(() => {
                    return null;
                })
        } else {
            return await this.findByCreatorId(parseInt(id));
        }
    }
}