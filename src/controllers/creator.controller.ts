import { Request, Response } from 'express';
import creatorService from '../services/creator.service';

class CreatorController {
    async create(req: Request, res: Response) {
        const result = await creatorService.create(req.body)
        return res.status(result.statusCode).send(result.metaData);
    }
}

export default new CreatorController();