import { Request, Response } from 'express';
import storiesService from '../services/stories.service';

class StorieController {
    async create(req: Request, res: Response) {
        const event = req.params.event;
        const result = await storiesService.create(parseInt(event));
        return res.status(result.statusCode).send(result.metaData);
    }
}

export default new StorieController();