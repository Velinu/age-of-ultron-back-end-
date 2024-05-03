import { Request, Response, response } from 'express';
import creatorService from '../services/creator.service';

class CreatorController {
    async createFromApi(req: Request, res: Response) {
        const creatorId = req.params.eventId
        if (isNaN(parseInt(creatorId))) {
            return res.status(400).send();
        }
        const result = await creatorService.createFromApi(parseInt(creatorId))
        return res.status(result.statusCode).send(result.metaData);
    }

    async create(req: Request, res: Response) {
        const result = await creatorService.create(req.body);
        return res.status(result.statusCode).send(result.metaData);
    }

    async delete(req: Request, res: Response) {
        const result = await creatorService.deleteCreator(req.body.id);
        return res.status(result.statusCode).send(result.metaData);
    }

    async update(req: Request, res: Response) {
        const result = await creatorService.updateCreator(req.body);
        return res.status(result.statusCode).send(result.metaData);
    }

    async getCreatorByIds(req: Request, res: Response) {
        const id = req.params.id;
        const result = await creatorService.getCreatorByIds(id);
        return res.status(result.statusCode).send(result.metaData);
    }

    async getAllCreators(req: Request, res: Response) {
        const result = await creatorService.getAllCreators();
        return res.status(result.statusCode).send(result.metaData);
    }

    async getCreatorWithTheMostCreations(req: Request, res: Response) {
        const result = await creatorService.getCreatorWithTheMostCreations();
        return res.status(result.statusCode).send(result.metaData);
    }

}

export default new CreatorController();