import { title } from "process";
import { CreateCreatorDto } from "../dtos/creator/create-creator.dto";
import { UpdateCreatorDto } from "../dtos/creator/update-creator";
import { Errors } from "../enums/errors.enum";
import { HttpStatus } from "../enums/http-status.enum";
import { Messages } from "../enums/messages.enum";
import { CreatorRepository } from "../repositories/creator.repository";
import { MarvelApi } from "../useApi/marvel.useapi";
import { ServiceData } from "../utils/service-data";
import { CreatorInterface } from "../interfaces/creator.interface";

class CreatorService {
    private readonly repository = new CreatorRepository();
    private marvelApi = new MarvelApi();

    async createFromApi(creatorId: number) {
        let creators = await this.marvelApi.getCreatorsByEvent(creatorId);
        console.log(creators)

        if (creators) {
            creators.forEach(async (creator) => {
                return this.repository.findByCreatorId(creator.id)
                    .then((res) => {
                        if (res) { return }
                        this.repository.create(creator);
                    })
            })

            return new ServiceData(
                HttpStatus.OK,
                Messages.CREATORS_CREATED
            )
        }

        return new ServiceData(
            HttpStatus.BAD_REQUEST
        )
    }


    async create(createCreator: CreateCreatorDto) {
        try {
            if (createCreator.comics !== undefined && createCreator.comics.comic !== undefined) {
                createCreator.comics.available = createCreator.comics.comic.length;
            }

            if (createCreator.id !== undefined) {
                const exists = await this.repository.findByCreatorId(createCreator.id);
                if (exists) {
                    return new ServiceData(
                        HttpStatus.CONFLICT,
                        Errors.CREATOR_ID_ALREADY_IN_USE
                    )
                }
            }

            return this.repository.create(createCreator)
                .then((res) => {
                    return new ServiceData(
                        HttpStatus.OK,
                        Messages.CREATOR_CREATED_SUCCESSFULLY,
                        res
                    )
                })
                .catch((error) => {
                    console.error(error);
                    return new ServiceData(
                        HttpStatus.BAD_REQUEST,
                        Errors.MISSING_CREATOR_INFORMATIONS
                    )
                })

        } catch (error) {
            console.error(error);
            return new ServiceData(
                HttpStatus.BAD_REQUEST
            )
        }

    }

    async deleteCreator(id: string | number) {
        const exists = await this.repository.findByCreatorIds(id.toString());
        if (exists) {
            return this.repository.delete({ _id: exists._id })
                .then((res) => {
                    return new ServiceData(
                        HttpStatus.OK,
                        Messages.DELETED_CREATOR,
                        res
                    )
                })
                .catch((error) => {
                    console.error(error);
                    return new ServiceData(HttpStatus.INTERNAL_SERVER_ERROR)
                })
        }

        return new ServiceData(
            HttpStatus.NOT_FOUND,
            Errors.CREATOR_NOT_FOUND
        )
    }

    async updateCreator(updateCreator: UpdateCreatorDto) {
        console.log(updateCreator);
        const creator = await this.repository.findByCreatorIds(updateCreator._id);
        if (creator == null) {
            return new ServiceData(
                HttpStatus.BAD_REQUEST,
                Errors.CREATOR_NOT_FOUND
            )
        }

        if (updateCreator.comics !== undefined) {
            if (updateCreator.comics.comic !== undefined) {
                updateCreator.comics.available = updateCreator.comics.comic.length;
            }
        }

        if (updateCreator.detail !== undefined) {
            if (updateCreator.detail.length === 0) {
                return new ServiceData(
                    HttpStatus.BAD_REQUEST,
                    Errors.CREATOR_DETAIL_EMPTY
                )
            }
        }

        if (updateCreator.fullName !== undefined) {
            if (updateCreator.fullName.length === 0) {
                return new ServiceData(
                    HttpStatus.BAD_REQUEST,
                    Errors.CREATOR_FULLNAME_EMPTY
                )
            }
        }

        if (updateCreator.id) {
            const exists = await this.repository.findByCreatorIds(updateCreator.id.toString());
            if (exists) {
                return new ServiceData(
                    HttpStatus.CONFLICT,
                    Errors.CREATOR_ALREADY_EXISTS
                )
            }
        }

        return this.repository.updateOne({ _id: updateCreator._id }, updateCreator)
            .then(() => {
                return new ServiceData(
                    HttpStatus.OK,
                    Messages.UPDATED_CREATOR
                )
            })
            .catch((error) => {
                console.error(error);
                return new ServiceData(
                    HttpStatus.INTERNAL_SERVER_ERROR
                )
            })

    }

    async getCreatorByIds(id: string | number) {
        return this.repository.findByCreatorIds(id.toString())
            .then((res) => {
                if (res !== null) {
                    return new ServiceData(
                        HttpStatus.FOUND,
                        Messages.CREATOR_FOUND,
                        res
                    )
                }

                return new ServiceData(
                    HttpStatus.NOT_FOUND,
                    Errors.CREATOR_NOT_FOUND
                )
            })
            .catch(() => {
                return new ServiceData(
                    HttpStatus.NOT_FOUND,
                    Errors.CREATOR_NOT_FOUND
                )
            })
    }

    async getAllCreators() {
        return this.repository.find({})
            .then((res) => {
                if (res !== null) {
                    return new ServiceData(
                        HttpStatus.FOUND,
                        Messages.CREATORS_FOUND,
                        res
                    )

                }

                return new ServiceData(
                    HttpStatus.NOT_FOUND,
                    Errors.CREATORS_NOT_FOUND
                )
            })
            .catch(() => {
                return new ServiceData(
                    HttpStatus.NOT_FOUND,
                    Errors.CREATORS_NOT_FOUND
                )
            })
    }

    async getCreatorWithTheMostCreations() {
        try {
            const creators: CreatorInterface[] | null = await this.repository.find({});
            let mostCreations = 0;

            if (creators) {
                creators.forEach((el) => {
                    let creations = (el.events !== undefined ? el.events : 0) + (el.stories !== undefined ? el.stories : 0) + (el.series !== undefined ? el.series : 0);
                    if (creations > mostCreations) {
                        mostCreations = creations;
                    }
                })

                let highestCreators: Array<any> = [];

                creators.forEach((el) => {
                    if ((el.events !== undefined ? el.events : 0) + (el.stories !== undefined ? el.stories : 0) + (el.series !== undefined ? el.series : 0) == mostCreations) {
                        highestCreators.push(
                            {
                                name: el.fullName,
                                events: el.events !== undefined ? el.events : 0,
                                stories: el.stories !== undefined ? el.stories : 0,
                                series: el.series !== undefined ? el.series : 0
                            }
                        )
                    }
                })

                return new ServiceData(
                    HttpStatus.OK,
                    Messages.CREATOR_MOST_PARTICIPATIONS,
                    highestCreators
                )
            }

            return new ServiceData(
                HttpStatus.NOT_FOUND
            )

        } catch (error) {
            console.error(error)
            return new ServiceData(
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }
}

export default new CreatorService();