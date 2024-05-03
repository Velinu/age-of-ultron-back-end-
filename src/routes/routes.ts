import { Router } from 'express'
import eventController from '../controllers/event.controller'
import creatorController from '../controllers/creator.controller';
import storieController from '../controllers/storie.controller';
import comicController from '../controllers/comic.controller';
import characterController from '../controllers/character.controller';

const routes = Router();

routes.get('/events/create/:event', eventController.create);

/**
 * @swagger
 * /events/creators/create/{:eventId}:
 *  get:
 *      tags:
 *          - Creators
 *      description: Popular banco com os Creators
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: eventId
 *            required: true
 *      responses:
 *          200:
 *              description: Popula o banco com os Creators
 *          400:
 *              description: eventId inválido
 * 
 */
routes.get('/events/creators/create/:eventId', creatorController.createFromApi);

/**
 * @swagger
 * /events/comics/create/{:eventId}:
 *  get:
 *      tags:
 *          - Comics
 *      description: Popular banco com as Comics
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: eventId
 *            required: true
 *      responses:
 *          200:
 *              description: Popula o banco com as Comics
 *          400:
 *              description: eventId inválido
 * 
 */
routes.get('/events/comics/create/:eventid', comicController.createFromApi);

/**
 * @swagger
 * /events/stories/create/{:eventId}:
 *  get:
 *      tags:
 *          - Stories
 *      description: Popular banco com as Stories
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: eventId
 *            required: true
 *      responses:
 *          200:
 *              description: Popula o banco com as Stories
 *          400:
 *              description: eventId inválido
 * 
 */
routes.get('/events/stories/create/:eventId', storieController.create)


/**
 * @swagger
 * /comics/create:
 *  post:
 *      tags:
 *          - Comics
 *      description: Popular banco com as Stories
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: comic
 *            description: Comic to be created
 *            in: body
 *            required: true
 *            schema:
 *              $ref: '#/components/schemas/Comic'
 *      responses:
 *          200:
 *              description: Comic criada com sucesso
 *          400:
 *              description: |
 *                  Solicitação inválida
 *                  - Id da api já existente no banco de dados
 *                  - Informações incompletas
 */

routes.post('/comics/create', comicController.create);
routes.get('/comics/get/:id', comicController.getComicByIds);
routes.put('/comics/update', comicController.updateComicById);
routes.delete('/comics/delete', comicController.deleteComic);
routes.get('/comics/getnames', comicController.getNameOffAllComics);
routes.get('/comics/highestpages', comicController.getComicHighestNumberOfPages);

routes.post('/creators/create', creatorController.create);
routes.delete('/creators/delete', creatorController.delete);
routes.put('/creators/update', creatorController.update);
routes.get('/creators/get/:id', creatorController.getCreatorByIds);
routes.get('/creators/getall', creatorController.getAllCreators);
routes.get('/creators/mostcreations', creatorController.getCreatorWithTheMostCreations);

//routes.get('/characters/create/:id', characterController.create);
routes.get('/characters/:id', characterController.getCharacterById)
routes.get('/characters', characterController.getAllCharacters)
routes.get('/characters/extra/mostComics', characterController.getMostComics)
routes.get('/characters/extra/mostEvents', characterController.getMostEvents)
routes.get('/characters/extra/mostSeries', characterController.getMostSeries)
routes.post('/characters', characterController.postCharacter)
routes.patch('/characters/:id', characterController.patchCharacter)
routes.delete('/characters/:id', characterController.deleteCharacter)

export {
    routes
}