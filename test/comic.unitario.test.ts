import { ComicsClass } from "../src/classes/comics.class";
import { ComicClass } from "../src/classes/comic.class";
import { ComicRepository } from "../src/repositories/comic.repository";
import comicService, { ComicService } from "../src/services/comic.service";
import { MarvelApi } from "../src/useApi/marvel.useapi";
import { ValidateFields } from "../src/utils/validate-fields";
import { title } from "process";
import { ComicInterface } from "../src/interfaces/comic.interface";
import { ComicDocument } from "../src/schemas/comic.schema";
import { HttpStatus } from "../src/enums/http-status.enum";


describe('ComicService', () => {
    let service: ComicService;

    let mockComicRepository: jest.Mocked<ComicRepository>;
    let mockMarvelApi: jest.Mocked<MarvelApi>;

    beforeEach(() => {
        mockComicRepository = {
            findAllComics: jest.fn(),
            findByComicId: jest.fn(),
            findComicByIds: jest.fn(),
            getTitleOfComics: jest.fn(),
            create: jest.fn(),
            updateOne: jest.fn(),
        } as any;

        mockMarvelApi = {
            getComicsByEvent: jest.fn(),
        } as any;

        service = new ComicService(mockComicRepository, mockMarvelApi, new ValidateFields());
    });

    describe('Comics unity test', () => {
        it('Should be populate database with comics', async () => {
            const mockComics: ComicsClass[] | null = [
                new ComicsClass(1, 'mock1', 'test', new Date(), 'test', 10),
                new ComicsClass(2, 'mock1', 'test', new Date(), 'test', 10),
            ]

            let create: any = { _id: '1w1w', title: 'test', description: 'aa', publication: new Date(), thumbnail: 'aa', pageCount: 10, createdAt: new Date(), updatedAt: new Date() }

            jest.spyOn(mockMarvelApi, 'getComicsByEvent').mockReturnValue(Promise.resolve(mockComics));
            jest.spyOn(mockComicRepository, 'findByComicId').mockReturnValue(Promise.resolve(null));
            jest.spyOn(mockComicRepository, 'create').mockReturnValue(Promise.resolve(create));
            const result = await service.createFromApi(314);

            expect(result.statusCode).toBe(HttpStatus.OK);
        })

        it('Should do not create comics if null is returned from action ', async () => {
            const mockComics: ComicsClass[] | null = null;

            jest.spyOn(mockMarvelApi, 'getComicsByEvent').mockReturnValue(Promise.resolve(mockComics));
            const result = await service.createFromApi(314);

            expect(result.statusCode).toBe(HttpStatus.BAD_REQUEST);
        })

        it('Should get comic with highest page count', async () => {
            const mockComics: ComicInterface[] | null = [
                { _id: '1w1wewe', title: 'test1', description: 'aa', publication: new Date(), thumbnail: 'aa', pageCount: 10, createdAt: new Date(), updatedAt: new Date() },
                { _id: '1w1wwewwf', title: 'test2', description: 'aaaa', publication: new Date(), thumbnail: 'aa', pageCount: 11, createdAt: new Date(), updatedAt: new Date() },
                { _id: '1w1whghf', title: 'test3', description: 'aa', publication: new Date(), thumbnail: 'aa', pageCount: 10, createdAt: new Date(), updatedAt: new Date() }
            ]
            jest.spyOn(mockComicRepository, 'findAllComics').mockReturnValue(Promise.resolve(mockComics))

            const result = await service.getComicHighestNumberOfPages();

            expect(result.statusCode).toBe(HttpStatus.OK)
            expect(result.metaData.data[0]._id).toBe(mockComics[1]._id)
        })

        it('Should do not get comic with highest page count if dont have comics', async () => {
            const mockComics: ComicInterface[] | null = null
            jest.spyOn(mockComicRepository, 'findAllComics').mockReturnValue(Promise.resolve(mockComics))

            const result = await service.getComicHighestNumberOfPages();

            expect(result.statusCode).toBe(HttpStatus.NOT_FOUND)
        })

        it('Should get comic by id (api id or mongo id)', async () => {
            const mockComics: ComicInterface | null = {
                _id: '1w1wewe', title: 'test1', description: 'aa', publication: new Date(), thumbnail: 'aa', pageCount: 10, createdAt: new Date(), updatedAt: new Date()
            }

            jest.spyOn(mockComicRepository, 'findComicByIds').mockReturnValue(Promise.resolve(mockComics))

            const result = await service.getComicByIds(32);

            expect(result.statusCode).toBe(HttpStatus.OK)
        })

        it('Should do not get comic by id (api id or mongo id) if invalid id', async () => {
            const mockComics: ComicInterface | null = null

            jest.spyOn(mockComicRepository, 'findComicByIds').mockReturnValue(Promise.resolve(mockComics))

            const result = await service.getComicByIds(32);

            expect(result.statusCode).toBe(HttpStatus.NOT_FOUND)
        })

        it('Should be get all comics name', async () => {
            const mockComics: any[] = [
                { title: 'mock1' },
                { title: 'mock2' },
            ]

            jest.spyOn(mockComicRepository, 'getTitleOfComics').mockReturnValue(Promise.resolve(mockComics));

            const result = await service.getNameOffAllComics();

            expect(result.statusCode).toBe(HttpStatus.OK);
        })

        it('Should be create comic', async () => {
            const comic: any = {
                "id": 21331111,
                "title": "Comic title",
                "description": "Comic Description",
                "publication": "2024-05-03T05:16:21.009Z",
                "thumbnail": "http://i.annihil.us/u/prod/marvel/i/mg/7/70/5159b4df9e785.jpg",
                "pageCount": 32
            }

            const comicFound: ComicInterface | null = null
            const comicCreated: any = { _id: '1w1whghf', title: 'test3', description: 'aa', publication: new Date(), thumbnail: 'aa', pageCount: 10, createdAt: new Date(), updatedAt: new Date() }


            jest.spyOn(mockComicRepository, 'findByComicId').mockReturnValue(Promise.resolve(comicFound))
            jest.spyOn(mockComicRepository, 'create').mockReturnValue(Promise.resolve(comicCreated));

            const result = await service.create(comic)

            expect(result.statusCode).toBe(HttpStatus.OK)
        })

        it('Should do not create comic if id already exists', async () => {
            const comic: any = {
                "id": 21331111,
                "title": "Comic title",
                "description": "Comic Description",
                "publication": "2024-05-03T05:16:21.009Z",
                "thumbnail": "http://i.annihil.us/u/prod/marvel/i/mg/7/70/5159b4df9e785.jpg",
                "pageCount": 32
            }

            const comicFound: ComicInterface | null = { _id: '1w1whghf', title: 'test3', description: 'aa', publication: new Date(), thumbnail: 'aa', pageCount: 10, createdAt: new Date(), updatedAt: new Date() }

            jest.spyOn(mockComicRepository, 'findByComicId').mockReturnValue(Promise.resolve(comicFound))

            const result = await service.create(comic)

            expect(result.statusCode).toBe(HttpStatus.BAD_REQUEST)
        })

        it('Should be update comic', async () => {
            const mockComics: ComicInterface | null = null
            const mockComic: any = {
                "id": 21331111,
                "title": "Comic title",
                "description": "Comic Description",
                "publication": "2024-05-03T05:16:21.009Z",
                "thumbnail": "http://i.annihil.us/u/prod/marvel/i/mg/7/70/5159b4df9e785.jpg",
                "pageCount": 32
            }
            let update: any = true
            jest.spyOn(mockComicRepository, 'findComicByIds').mockReturnValueOnce(Promise.resolve(mockComic));
            jest.spyOn(mockComicRepository, 'findComicByIds').mockReturnValueOnce(Promise.resolve(mockComics));
            jest.spyOn(mockComicRepository, 'updateOne').mockReturnValue(Promise.resolve(update));


            const result = await service.updateComicById(mockComic);

            expect(result.statusCode).toBe(HttpStatus.OK);
        })

        it('Should dont update comic if update error', async () => {
            const mockComics: ComicInterface | null = null
            const mockComic: any = {
                "id": 21331111,
                "title": "Comic title",
                "description": "Comic Description",
                "publication": "2024-05-03T05:16:21.009Z",
                "thumbnail": "http://i.annihil.us/u/prod/marvel/i/mg/7/70/5159b4df9e785.jpg",
                "pageCount": 32
            }
            jest.spyOn(mockComicRepository, 'findComicByIds').mockReturnValueOnce(Promise.resolve(mockComic));
            jest.spyOn(mockComicRepository, 'findComicByIds').mockReturnValueOnce(Promise.resolve(mockComics));
            jest.spyOn(mockComicRepository, 'updateOne').mockRejectedValue(new Error());


            const result = await service.updateComicById(mockComic);

            expect(result.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        })
    });



});
