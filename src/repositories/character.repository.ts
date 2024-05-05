import { GenericRepository } from "./generic/generic-repository.repository";
import characterModel from '../schemas/characters.schema'
import { CharacterDocument } from "../schemas/characters.schema";

export class CharacterRepository extends GenericRepository<CharacterDocument> {
    constructor() {
        super(characterModel);
    }

    async findByCharacterId(id: number) {
        return this.findOne({ id: id })
            .then((res) => {
                return res;
            })
            .catch(() => {
                return null;
            })
    }

    async findWithMostComics() {
        return this.findMostComics()
            .then((res) => {
                return res;
            })
            .catch(() => {
                return null;
            })
    }

    async getAllCharacters() {
        return this.find({})
            .then((res) => {
                return res;
            })
            .catch(() => {
                return null;
            })
    }
}