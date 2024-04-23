import { Request, Response } from 'express';
import eventService from '../services/event.service'

class EventController {
    async create(req: Request, res: Response) {
        const event = req.params.event;
        const result = await eventService.create(parseInt(event));
        return res.status(result.statusCode).send(result.metaData);
    }
}

export default new EventController();