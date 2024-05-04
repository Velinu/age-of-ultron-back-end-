import { Errors } from "../enums/errors.enum";
import { HttpStatus } from "../enums/http-status.enum";
import { Messages } from "../enums/messages.enum";
import { MarvelApi } from "../useApi/marvel.useapi";
import { ServiceData } from "../utils/service-data";
import { CharacterRepository } from "../repositories/character.repository"
import { StandardizeData } from "../utils/standardize-data";

class CharacterService {
    private readonly repository = new CharacterRepository();
    private readonly standardizeData = new StandardizeData()
    private marvelApi = new MarvelApi();

    async create(id: number) {
        const charactersResult = await this.marvelApi.getCharactersByEvent(id);
        this.standardizeData.standardize(charactersResult)

        if (charactersResult) {
            charactersResult.forEach(async (character: any) => {
                return this.repository.findByCharacterId(character.id)
                    .then((res) => {
                        if (res) { return }
                        try {
                            this.repository.create(character)
                        } catch (error) {
                            console.error(error)
                        }
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            })

            return new ServiceData(
                HttpStatus.OK,
                Messages.CREATE_CHARACTERS_SUCCESSFULLY
            )
        }

        return new ServiceData(
            HttpStatus.BAD_REQUEST
        )
    }

    async getCharacterById(id: number) {
        return await this.repository.findByCharacterId(id)
            .then((e: any) => {
                if (e.length === 0) {
                    return new ServiceData(
                        HttpStatus.NOT_FOUND,
                    )
                }

                return new ServiceData(
                    HttpStatus.OK,
                    e
                )
            })
            .catch((e) => {
                return new ServiceData(
                    HttpStatus.BAD_REQUEST,
                    Errors.NO_CHARACTERS_FOUND
                )
            })
    }

    async getAllCharacters() {
        return await this.repository.getAllCharacters()
            .then((e: any) => {
                if (e.length === 0) {
                    return new ServiceData(
                        HttpStatus.NOT_FOUND,
                    )
                }

                return new ServiceData(
                    HttpStatus.OK,
                    e
                )
            })
            .catch((e: any) => {
                return new ServiceData(
                    HttpStatus.BAD_REQUEST,
                    Errors.NO_CHARACTERS_FOUND
                )
            })
    }

    async postCharacter(data: any) {
        const missingFields: Array<String> = this.standardizeData.standardizePostCharacter(data)

        if (missingFields.length > 0) {
            return new ServiceData(
                HttpStatus.BAD_REQUEST,
                Errors.MISSING_FIELDS + missingFields
            )
        }

        if (data.id) {
            const exists = await this.repository.findByCharacterId(data.id);
            if (exists) {
                return new ServiceData(
                    HttpStatus.BAD_REQUEST,
                )
            }
        }
        return await this.repository.create(data)
            .then(() => {
                return new ServiceData(
                    HttpStatus.CREATED,
                    Messages.CREATE_CHARACTERS_SUCCESSFULLY
                )
            })
            .catch((e: any) => {
                console.log(e)
                return new ServiceData(
                    HttpStatus.BAD_REQUEST,
                    Errors.POST_CHARACTER
                )
            })
    }

    async patchCharacter(data: any, id: any) {
        const isObjectId = /\D/.test(id)
        const missingFields: Array<String> = this.standardizeData.standardizePatchCharacter(data)
        data.modified = new Date()

        if (missingFields.length > 0) {
            return new ServiceData(
                HttpStatus.BAD_REQUEST,
                Errors.MISSING_FIELDS + missingFields
            )
        }

        if (!isObjectId) {
            return await this.repository.updateOne({ id: Number(id) }, data)
                .then((e: any) => {
                    return new ServiceData(
                        HttpStatus.OK,
                        Messages.PATCH_CHARACTERS_SUCCESSFULLY
                    )
                })
                .catch((e: any) => {
                    return new ServiceData(
                        HttpStatus.BAD_REQUEST,
                        Errors.PATCH_CHARACTER
                    )
                })
        }

        return await this.repository.updateOne({ _id: id }, data)
            .then((e: any) => {
                return new ServiceData(
                    HttpStatus.OK,
                    Messages.PATCH_CHARACTERS_SUCCESSFULLY
                )
            })
            .catch((e: any) => {
                return new ServiceData(
                    HttpStatus.BAD_REQUEST,
                    Errors.PATCH_CHARACTER
                )
            })
    }

    async deleteCharacter(data: any, id: any) {
        const isObjectId = /\D/.test(id);

        if (!isObjectId) {
            return await this.repository.deleteOne({ id: Number(id) }, data)
                .then((e: any) => {
                    return new ServiceData(
                        HttpStatus.OK,
                        Messages.DELETE_CHARACTERS_SUCCESSFULLY
                    )
                })
                .catch((e: any) => {
                    return new ServiceData(
                        HttpStatus.BAD_REQUEST,
                        Errors.DELETE_CHARACTER
                    )
                })
        }

        return await this.repository.deleteOne({ _id: id }, data)
            .then((e: any) => {
                return new ServiceData(
                    HttpStatus.OK,
                    Messages.DELETE_CHARACTERS_SUCCESSFULLY
                )
            })
            .catch((e: any) => {
                return new ServiceData(
                    HttpStatus.BAD_REQUEST,
                    Errors.DELETE_CHARACTER
                )
            })
    }

    async getMostComicCharacter() {

        return await this.repository.findWithMostComics()
            .then((e: any) => {
                return new ServiceData(
                    HttpStatus.OK,
                    e
                )
            })
            .catch((e: any) => {
                return new ServiceData(
                    HttpStatus.BAD_REQUEST,
                    Errors.NO_CHARACTERS_FOUND
                )
            })
    }

    async getMostEventCharacter() {

        return await this.repository.findWithMostEvents()
            .then((e: any) => {
                return new ServiceData(
                    HttpStatus.OK,
                    e
                )
            })
            .catch((e: any) => {
                return new ServiceData(
                    HttpStatus.BAD_REQUEST,
                    Errors.NO_CHARACTERS_FOUND
                )
            })
    }

    async getMostSerieCharacter() {

        return await this.repository.findWithMostSeries()
            .then((e: any) => {
                return new ServiceData(
                    HttpStatus.OK,
                    e
                )
            })
            .catch((e: any) => {
                return new ServiceData(
                    HttpStatus.BAD_REQUEST,
                    Errors.NO_CHARACTERS_FOUND
                )
            })
    }

    

}

export default new CharacterService();

