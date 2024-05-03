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
        if (!charactersResult) {
            return new ServiceData(
                HttpStatus.NOT_FOUND
            )
        }

        this.standardizeData.standardize(charactersResult)

        charactersResult.forEach(async (e: any) => {
            await this.repository.create(charactersResult)
                .catch(e => { return null })
        })

        return new ServiceData(
            HttpStatus.OK,
            Messages.CREATE_CHARACTERS_SUCCESSFULLY
        )
    }

    async getCharacterById(id: number) {
        return await this.marvelApi.getCharacterById(id)
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
        return await this.marvelApi.getAllCharacters()
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

    async postCharacter(data: any) {
        const missingFields: Array<String> = this.standardizeData.standardizePostCharacter(data)

        if (missingFields.length > 0) {
            return new ServiceData(
                HttpStatus.CREATED,
                Errors.MISSING_FIELDS + missingFields
            )
        }

        return await this.repository.create(data)
            .then((e: any) => {
                return new ServiceData(
                    HttpStatus.CREATED,
                    Messages.CREATE_CHARACTERS_SUCCESSFULLY
                )
            })
            .catch((e: any) => {
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
                HttpStatus.CREATED,
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

