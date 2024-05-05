import { ComicsClass } from "../classes/comics.class";
import { CreateComicDto } from "../dtos/comic/create-comic.dto";
import { UpdateComicDto } from "../dtos/comic/update-comic.dto";
import { Errors } from "../enums/errors.enum";
import { HttpStatus } from "../enums/http-status.enum";
import { Messages } from "../enums/messages.enum";
import { ComicRepository } from "../repositories/comic.repository";
import { MarvelApi } from "../useApi/marvel.useapi";
import { ServiceData } from "../utils/service-data";
import { ValidateFields } from "../utils/validate-fields";

export class ComicService {
    private readonly repository;
    private marvelApi;
    private validator;
    constructor(
        repository: ComicRepository,
        marvelApi: MarvelApi,
        validator: ValidateFields,
    ) {
        this.repository = repository;
        this.marvelApi = marvelApi;
        this.validator = validator
    }

    async createFromApi(eventId: number) {
        let comics = await this.marvelApi.getComicsByEvent(eventId);

        if (comics !== null) {
            comics.forEach(async (comic) => {
                return this.repository.findByComicId(comic.id)
                    .then((res) => {
                        if (res) { return }
                        try {
                            this.repository.create(comic)
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
                Messages.COMICS_CREATED
            )
        }

        return new ServiceData(
            HttpStatus.BAD_REQUEST
        )
    }




    async create(createComic: CreateComicDto) {
        if (createComic.id) {
            const exists = await this.repository.findByComicId(createComic.id);
            if (exists) {
                return new ServiceData(
                    HttpStatus.BAD_REQUEST,
                    Errors.COMIC_ID_ALREADY_IN_USE
                )
            }
        }

        return this.repository.create(createComic)
            .then((res) => {
                return new ServiceData(
                    HttpStatus.OK,
                    Messages.COMIC_CREATED,
                    res
                )
            })
            .catch((error) => {
                console.log(error);
                return new ServiceData(
                    HttpStatus.BAD_REQUEST,
                    Errors.MISSING_COMIC_INFORMATIONS
                )
            })
    }

    async getAllComics() {
        return this.repository.findAllComics()
            .then((res) => {
                if (res) {
                    return new ServiceData(
                        HttpStatus.OK,
                        Messages.COMICS_FOUND,
                        res
                    )
                }

                return new ServiceData(
                    HttpStatus.NOT_FOUND
                )
            })
    }

    async getComicByIds(id: string | number) {
        return this.repository.findComicByIds(id.toString())
            .then((res) => {
                if (res) {
                    return new ServiceData(
                        HttpStatus.OK,
                        Messages.COMIC_FOUND,
                        res
                    )
                }

                return new ServiceData(
                    HttpStatus.NOT_FOUND,
                    Errors.COMIC_NOT_FOUND
                )
            })
    }

    async updateComicById(updateComic: UpdateComicDto) {
        const comic = await this.repository.findComicByIds(updateComic._id);
        if (comic == null) {
            return new ServiceData(
                HttpStatus.BAD_REQUEST,
                Errors.COMIC_NOT_FOUND
            )
        }

        if (updateComic.description !== undefined) {
            if (updateComic.description.length == 0) {
                return new ServiceData(
                    HttpStatus.BAD_REQUEST,
                    Errors.INCORRECT_COMIC_DESCRIPTION
                )
            }
        }

        if (updateComic.id !== undefined) {
            const exists = await this.repository.findComicByIds(updateComic.id.toString());
            if (exists) {
                return new ServiceData(
                    HttpStatus.CONFLICT,
                    Errors.COMIC_ID_ALREADY_IN_USE
                )
            }
        }

        if (updateComic.title !== undefined) {
            if (updateComic.title.length == 0) {
                return new ServiceData(
                    HttpStatus.BAD_REQUEST,
                    Errors.INCORRECT_COMIC_TITLE
                )
            }
        }

        return this.repository.updateOne({ _id: updateComic._id }, updateComic)
            .then(() => {
                return new ServiceData(
                    HttpStatus.OK,
                    Messages.UPDATED_COMIC
                )
            })
            .catch((error) => {
                console.log(error);
                return new ServiceData(
                    HttpStatus.INTERNAL_SERVER_ERROR
                )
            })
    }


    async deleteComic(id: string | number) {
        if (id !== undefined) {
            const exists = await this.repository.findComicByIds(id.toString());

            if (exists) {
                return this.repository.delete({ _id: exists._id })
                    .then((res) => {
                        return new ServiceData(
                            HttpStatus.OK,
                            Messages.DELETED_COMIC,
                            res
                        )
                    })
                    .catch((error) => {
                        console.error(error);
                        return new ServiceData(HttpStatus.INTERNAL_SERVER_ERROR)
                    })
            }
        }

        return new ServiceData(
            HttpStatus.NOT_FOUND,
            Errors.COMIC_NOT_FOUND
        )
    }

    async getNameOffAllComics() {
        return this.repository.getTitleOfComics()
            .then((res) => {
                return new ServiceData(
                    HttpStatus.OK,
                    Messages.COMICS_TITLE,
                    res
                )
            })
    }

    async getComicHighestNumberOfPages() {
        const comics = await this.repository.findAllComics();
        let highest: number;

        if (comics !== null) {
            highest = comics[0].pageCount;
            comics.forEach((el) => {
                if (el.pageCount > highest) {
                    highest = el.pageCount;
                }
            })

            const highestComics = comics.filter((el) => el.pageCount === highest);

            return new ServiceData(
                HttpStatus.OK,
                Messages.HIGHEST_COMIC_PAGE_COUNT,
                highestComics
            )
        }

        return new ServiceData(
            HttpStatus.NOT_FOUND
        )
    }




}

export default new ComicService(new ComicRepository, new MarvelApi(), new ValidateFields);