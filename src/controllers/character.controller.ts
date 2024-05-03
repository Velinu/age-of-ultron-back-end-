import { Request, Response } from 'express';
import characterService from '../services/character.service'

class EventController {
    async create(req: Request, res: Response) {
        const result = await characterService.create(Number(req.params.id));
        return res.status(result.statusCode).send(result.metaData);
    }

    async getCharacterById(req: Request, res: Response) {
        const result = await characterService.getCharacterById(Number(req.params.id))
        return res.status(result.statusCode).send(result.metaData)
    }

    async getAllCharacters(req: Request, res: Response) {
        const result = await characterService.getAllCharacters()
        return res.status(result.statusCode).send(result.metaData)
    }

    async postCharacter(req: Request, res: Response){
        const result = await characterService.postCharacter(req.body)
        return res.status(result.statusCode).send(result.metaData)
    }

    async patchCharacter(req: Request, res: Response){
        const result = await characterService.patchCharacter(req.body, req.params.id)
        return res.status(result.statusCode).send(result.metaData)
    }

    async deleteCharacter(req: Request, res: Response){
        const result = await characterService.deleteCharacter(req.body, req.params.id)
        return res.status(result.statusCode).send(result.metaData)
    }

    async getMostComics(req: Request, res: Response){
        const result = await characterService.getMostComicCharacter()
        return res.status(result.statusCode).send(result.metaData)
    }

    async getMostEvents(req: Request, res: Response){
        const result = await characterService.getMostEventCharacter()
        return res.status(result.statusCode).send(result.metaData)
    }
    
    async getMostSeries(req: Request, res: Response){
        const result = await characterService.getMostSerieCharacter()
        return res.status(result.statusCode).send(result.metaData)
    }
}

export default new EventController();