import { Request, Response } from 'express';
import comicService from '../services/comic.service';

class ComicController {
    async createFromApi(req: Request, res: Response) {
        const eventId = req.params.eventid
        if (isNaN(parseInt(eventId))) {
            return res.status(400).send();
        }
        const result = await comicService.createFromApi(parseInt(eventId));
        return res.status(result.statusCode).send(result.metaData);
    }

    async create(req: Request, res: Response) {
        const result = await comicService.create(req.body);
        return res.status(result.statusCode).send(result.metaData);
    }

    async getComicByIds(req: Request, res: Response) {
        const id = req.params.id;
        const result = await comicService.getComicByIds(id.toString());
        return res.status(result.statusCode).send(result.metaData);
    }

    async updateComicById(req: Request, res: Response) {
        const result = await comicService.updateComicById(req.body);
        return res.status(result.statusCode).send(result.metaData);
    }

    async deleteComic(req: Request, res: Response) {
        const result = await comicService.deleteComic(req.body.id);
        return res.status(result.statusCode).send(result.metaData);
    }


    async getNameOffAllComics(req: Request, res: Response) {
        const result = await comicService.getNameOffAllComics();
        return res.status(result.statusCode).send(result.metaData);
    }

    async getComicHighestNumberOfPages(req: Request, res: Response) {
        const result = await comicService.getComicHighestNumberOfPages();
        return res.status(result.statusCode).send(result.metaData);
    }
}

export default new ComicController();