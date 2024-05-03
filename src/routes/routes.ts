import { Router } from 'express'
import eventController from '../controllers/event.controller'
import creatorController from '../controllers/creator.controller';
import storieController from '../controllers/storie.controller';
import comicController from '../controllers/comic.controller';
import characterController from '../controllers/character.controller';

const routes = Router();

routes.get('/events/create/:event', eventController.create);
routes.get('/events/creators/create/:eventId', creatorController.createFromApi);
routes.get('/events/comics/create/:eventid', comicController.createFromApi);
routes.get('/stories/create/:eventId', storieController.create)


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