import { ComicRepository } from "../src/repositories/comic.repository";
import { ComicService } from "../src/services/comic.service";
import { MarvelApi } from "../src/useApi/marvel.useapi";
import { ValidateFields } from "../src/utils/validate-fields";


describe('ComicService', () => {
    let service: ComicService;
    let mockComicRepository: jest.Mocked<ComicRepository>;

    beforeEach(() => {
        mockComicRepository = {
            findAllComics: jest.fn(),
            // Adicione aqui outros métodos que você deseja mockar
        } as any;

        service = new ComicService(mockComicRepository, new MarvelApi(), new ValidateFields());
    });

    describe('getAllComics', () => {

    });
});
