import { CreatorInterface } from "src/interfaces/creator.interface";
import { ComicFullClass } from "../src/classes/comic-full.class";
import { ComicClass } from "../src/classes/comic.class";
import { CreatorClass } from "../src/classes/creator.class";
import { HttpStatus } from "../src/enums/http-status.enum";
import { CreatorRepository } from "../src/repositories/creator.repository";
import { CreatorService } from "../src/services/creator.service";
import { MarvelApi } from "../src/useApi/marvel.useapi";

describe('ComicService', () => {
    let service: CreatorService;

    let mockCreatorRepository: jest.Mocked<CreatorRepository>;
    let mockMarvelApi: jest.Mocked<MarvelApi>;

    beforeEach(() => {
        mockCreatorRepository = {
            findAllComics: jest.fn(),
            findByCreatorId: jest.fn(),
            findByCreatorIds: jest.fn(),
            find: jest.fn(),
            create: jest.fn(),
            updateOne: jest.fn(),
        } as any;

        mockMarvelApi = {
            getCreatorsByEvent: jest.fn(),
        } as any;

        service = new CreatorService(mockCreatorRepository, mockMarvelApi);
    });

    it('Should be populate database with creator', async () => {
        const mockCreators: CreatorClass[] | null = [
            new CreatorClass(1, 'Robert Grey', 200, 500, 4, 'detal.com', new ComicFullClass(20, [new ComicClass(234, 'a')])),
            new CreatorClass(2, 'Robert Grey', 200, 500, 4, 'detal.com', new ComicFullClass(20, [new ComicClass(234, 'a')])),
        ]

        let create: any = {
            "id": 34,
            "fullName": "Creator Full Name",
            "comics": [
                {
                    "id": 234,
                    "name": "Comic Name"
                }
            ],
            "series": 200,
            "stories": 145,
            "events": 4,
            "detail": "https://detailurl.com"
        }

        jest.spyOn(mockMarvelApi, 'getCreatorsByEvent').mockReturnValue(Promise.resolve(mockCreators));
        jest.spyOn(mockCreatorRepository, 'findByCreatorId').mockReturnValue(Promise.resolve(null));
        jest.spyOn(mockCreatorRepository, 'create').mockReturnValue(Promise.resolve(create));
        const result = await service.createFromApi(314);

        expect(result.statusCode).toBe(HttpStatus.OK);
    })

    it('Should do not create creators if null is returned from action ', async () => {
        const mockCreators: CreatorClass[] | null = null;

        jest.spyOn(mockMarvelApi, 'getCreatorsByEvent').mockReturnValue(Promise.resolve(mockCreators));
        const result = await service.createFromApi(314);

        expect(result.statusCode).toBe(HttpStatus.BAD_REQUEST);
    })

    it('Should get creator by id (api id or mongo id)', async () => {
        const mockCreator: CreatorInterface | null = {
            "_id": 'fj343',
            "id": 34,
            "fullName": "Creator Full Name",
            "comics": {
                "available": 1,
                "comic": [
                    {
                        "id": 234,
                        "name": "Comic Name"
                    }
                ]
            },
            "series": 200,
            "stories": 145,
            "events": 4,
            "detailUrl": 'detail.com',
            "createdAt": new Date(),
            "updatedAt": new Date(),
        }

        jest.spyOn(mockCreatorRepository, 'findByCreatorIds').mockReturnValue(Promise.resolve(mockCreator))

        const result = await service.getCreatorByIds(32);

        expect(result.statusCode).toBe(HttpStatus.OK)
    })

    it('Should do not get creator by id (api id or mongo id) if invalid id', async () => {
        const mockCreator: CreatorInterface | null = null

        jest.spyOn(mockCreatorRepository, 'findByCreatorIds').mockReturnValue(Promise.resolve(mockCreator))

        const result = await service.getCreatorByIds(32);

        expect(result.statusCode).toBe(HttpStatus.NOT_FOUND)
    })

    it('Should be get all creators', async () => {
        const mockCreators: any[] = [
            { name: 'mock1' },
            { name: 'mock2' },
        ]

        jest.spyOn(mockCreatorRepository, 'find').mockReturnValue(Promise.resolve(mockCreators));

        const result = await service.getAllCreators();

        expect(result.statusCode).toBe(HttpStatus.OK);
    })

    it('Should be return not found if dont have creators', async () => {
        const mockCreators: any = null

        jest.spyOn(mockCreatorRepository, 'find').mockReturnValue(Promise.resolve(mockCreators));

        const result = await service.getAllCreators();

        expect(result.statusCode).toBe(HttpStatus.NOT_FOUND);
    })

    it('Should be return not found if find error', async () => {

        jest.spyOn(mockCreatorRepository, 'find').mockRejectedValue(new Error())

        const result = await service.getAllCreators();

        expect(result.statusCode).toBe(HttpStatus.NOT_FOUND);
    })

    it('Should be get creator with the most creations', async () => {
        const mockCreators: any[] | null = [
            {
                "_id": 'fj343',
                "id": 34,
                "fullName": "Creator Full Name",
                "comics": {
                    "available": 1,
                    "comic": [
                        {
                            "id": 234,
                            "name": "Comic Name"
                        }
                    ]
                },
                "series": 200,
                "stories": 145,
                "events": 4,
                "detailUrl": 'detail.com',
                "createdAt": new Date(),
                "updatedAt": new Date(),
            },
            {
                "_id": 'woij3',
                "id": 35,
                "fullName": "Creator Full Name",
                "comics": {
                    "available": 1,
                    "comic": [
                        {
                            "id": 234,
                            "name": "Comic Name"
                        }
                    ]
                },
                "series": 201,
                "stories": 145,
                "events": 4,
                "detailUrl": 'detail.com',
                "createdAt": new Date(),
                "updatedAt": new Date(),
            }
        ]

        jest.spyOn(mockCreatorRepository, 'find').mockReturnValue(Promise.resolve(mockCreators));

        const result = await service.getCreatorWithTheMostCreations();

        console.log(result.metaData.data)
        expect(result.statusCode).toBe(HttpStatus.OK);
        expect(result.metaData.data.length).toBe(1);
    })

    it('Should be create creator', async () => {

        let create: any = {
            "id": 34,
            "fullName": "Creator Full Name",
            "comics": [
                {
                    "id": 234,
                    "name": "Comic Name"
                }
            ],
            "series": 200,
            "stories": 145,
            "events": 4,
            "detail": "https://detailurl.com"
        }

        const mockReturnCreator: any = {
            title: 'new creator'
        }

        jest.spyOn(mockCreatorRepository, 'findByCreatorId').mockReturnValue(Promise.resolve(null));
        jest.spyOn(mockCreatorRepository, 'create').mockReturnValue(Promise.resolve(mockReturnCreator));

        const result = await service.create(create);

        expect(result.statusCode).toBe(HttpStatus.OK)
        expect(result.metaData.data.title).toBe('new creator');
    })

    it('Should do not create creator when id already exists', async () => {

        let create: any = {
            "id": 34,
            "fullName": "Creator Full Name",
            "comics": [
                {
                    "id": 234,
                    "name": "Comic Name"
                }
            ],
            "series": 200,
            "stories": 145,
            "events": 4,
            "detail": "https://detailurl.com"
        }

        const mockExists: any = {
            title: 'creator'
        }

        jest.spyOn(mockCreatorRepository, 'findByCreatorId').mockReturnValue(Promise.resolve(mockExists));

        const result = await service.create(create);

        expect(result.statusCode).toBe(HttpStatus.CONFLICT)
    })

    it('Should be update creator', async () => {
        const creatorExists: any = {
            "_id": 'fj343',
            "id": 34,
            "fullName": "Creator Full Name",
            "comics": {
                "available": 1,
                "comic": [
                    {
                        "id": 234,
                        "name": "Comic Name"
                    }
                ]
            },
            "series": 200,
            "stories": 145,
            "events": 4,
            "detailUrl": 'detail.com',
            "createdAt": new Date(),
            "updatedAt": new Date(),
        }

        let update: any = true
        jest.spyOn(mockCreatorRepository, 'findByCreatorIds').mockReturnValueOnce(Promise.resolve(creatorExists))
        jest.spyOn(mockCreatorRepository, 'findByCreatorIds').mockReturnValueOnce(Promise.resolve(null))
        jest.spyOn(mockCreatorRepository, 'updateOne').mockReturnValue(Promise.resolve(update))

        const result = await service.updateCreator(creatorExists);

        expect(result.statusCode).toBe(HttpStatus.OK);
    })

    it('Should do not update creator when creator doesnt exists', async () => {
        const creatorExists: any = {
            "_id": 'fj343',
            "id": 34,
            "fullName": "Creator Full Name",
            "comics": {
                "available": 1,
                "comic": [
                    {
                        "id": 234,
                        "name": "Comic Name"
                    }
                ]
            },
            "series": 200,
            "stories": 145,
            "events": 4,
            "detailUrl": 'detail.com',
            "createdAt": new Date(),
            "updatedAt": new Date(),
        }

        jest.spyOn(mockCreatorRepository, 'findByCreatorIds').mockReturnValueOnce(Promise.resolve(null))

        const result = await service.updateCreator(creatorExists);

        expect(result.statusCode).toBe(HttpStatus.BAD_REQUEST);
    })

    it('Should do not update creator when fullName length equal 0', async () => {
        const creatorExists: any = {
            "_id": 'fj343',
            "id": 34,
            "fullName": "",
            "comics": {
                "available": 1,
                "comic": [
                    {
                        "id": 234,
                        "name": "Comic Name"
                    }
                ]
            },
            "series": 200,
            "stories": 145,
            "events": 4,
            "detailUrl": 'aaa',
            "createdAt": new Date(),
            "updatedAt": new Date(),
        }

        jest.spyOn(mockCreatorRepository, 'findByCreatorIds').mockReturnValueOnce(Promise.resolve(creatorExists))

        const result = await service.updateCreator(creatorExists);

        expect(result.statusCode).toBe(HttpStatus.BAD_REQUEST);
    })

    it('Should do not update creator if id already exists', async () => {
        const creatorExists: any = {
            "_id": 'fj343',
            "id": 34,
            "fullName": "Creator Full Name",
            "comics": {
                "available": 1,
                "comic": [
                    {
                        "id": 234,
                        "name": "Comic Name"
                    }
                ]
            },
            "series": 200,
            "stories": 145,
            "events": 4,
            "detailUrl": 'detail.com',
            "createdAt": new Date(),
            "updatedAt": new Date(),
        }

        let update: any = true
        jest.spyOn(mockCreatorRepository, 'findByCreatorIds').mockReturnValueOnce(Promise.resolve(creatorExists))
        jest.spyOn(mockCreatorRepository, 'findByCreatorIds').mockReturnValueOnce(Promise.resolve(creatorExists))

        const result = await service.updateCreator(creatorExists);

        expect(result.statusCode).toBe(HttpStatus.CONFLICT);
    })



});