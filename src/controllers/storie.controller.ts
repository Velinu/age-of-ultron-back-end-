import { Request, Response } from 'express';
import storiesService from '../services/stories.service';

class StorieController {
    async create(req: Request, res: Response) {
        const eventId = req.params.eventid
        if (isNaN(parseInt(eventId))) {
            return res.status(400).send();
        }
        const result = await storiesService.create(parseInt(eventId));
        return res.status(result.statusCode).send(result.metaData);
    }
}

export default new StorieController();