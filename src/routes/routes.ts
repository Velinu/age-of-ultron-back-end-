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
 * /events/creators/create/{eventId}:
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
 * /events/comics/create/{eventId}:
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
 *              schema:
 *                  $ref: '#/components/schemas/ComicResponse'
 *          400:
 *              description: eventId inválido
 * 
 */
routes.get('/events/comics/create/:eventid', comicController.createFromApi);

/**
 * @swagger
 * /comics/highestpages:
 *  get:
 *      tags:
 *          - Comics
 *      description: Pegar a comic com maior número de páginas. Retorna 1 ou mais comics caso exista mais de uma com o maior número de páginas
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Comic com maior número de páginas
 *          404:
 *              description: Nenhuma comic encontrada
 * 
 */
routes.get('/comics/highestpages', comicController.getComicHighestNumberOfPages);

/**
 * @swagger
 * /comics/get/{id}:
 *  get:
 *      tags:
 *          - Comics
 *      description: Encontrar comic pelo id da api ou id do mongo
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *      responses:
 *          200:
 *              description: Comic encontrada
 *          404:
 *              description: Comic não encontrada
 * 
 */
routes.get('/comics/get/:id', comicController.getComicByIds);

/**
 * @swagger
 * /comics/getnames:
 *  get:
 *      tags:
 *          - Comics
 *      description: Pegar o nome de todas as comics do banco de dados
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Títulos das comics
 * 
 */
routes.get('/comics/getnames', comicController.getNameOffAllComics);


/**
 * @swagger
 * /comics/create:
 *  post:
 *      tags:
 *          - Comics
 *      description: Popular banco com as Comics
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


/**
 * @swagger
 * /comics/update:
 *  put:
 *      tags:
 *          - Comics
 *      description: Atualizar uma comic
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: updatecomic
 *            description: Comic e campos a serem atualizados
 *            in: body
 *            required: true
 *            schema:
 *              $ref: '#/components/schemas/UpdateComic'
 *      responses:
 *          200:
 *              description: Comic atualizada com sucesso
 *          400:
 *              description: |
 *                  Solicitação inválida
 *                  - Comic não encontrada
 *                  - Descrição incorreta
 *                  - Título incorreto
 *          409:
 *              description: O id da api da comic já está em uso
 *          500:
 *              description: Não foi possível atualizar a comic
 */
routes.put('/comics/update', comicController.updateComicById);

/**
 * @swagger
 * /comics/delete:
 *  delete:
 *      tags:
 *          - Comics
 *      description: Deletar uma comic
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: deletecomic
 *            description: Id da comic
 *            in: body
 *            required: true
 *            schema:
 *              $ref: '#/components/schemas/DeleteComic'
 *      responses:
 *          200:
 *              description: Comic deletada com sucesso
 *          404:
 *              description: Comic não encontrada
 *          500:
 *              description: Não foi possível deletar a comic
 */
routes.delete('/comics/delete', comicController.deleteComic);

/**
 * @swagger
 * /creators/get/{id}:
 *  get:
 *      tags:
 *          - Creators
 *      description: Encontrar creator pelo id da api ou id do mongo
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *      responses:
 *          200:
 *              description: Creator encontrado
 *          404:
 *              description: Creator não encontrado
 * 
 */
routes.get('/creators/get/:id', creatorController.getCreatorByIds);

/**
 * @swagger
 * /creators/getall:
 *  get:
 *      tags:
 *          - Creators
 *      description: Buscar todos os creators do banco de dados
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Creators encontrados
 *          404:
 *              description: Creators não encontrados
 * 
 */
routes.get('/creators/getall', creatorController.getAllCreators);

/**
 * @swagger
 * /creators/mostcreations:
 *  get:
 *      tags:
 *          - Creators
 *      description: Buscar creator com mais criações da saga. Caso tenha mais de um criador com o número máximo, ambos são reotrnados.
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Creator com mais criações
 *          404:
 *              description: Creators não encontrados
 *          500:
 *              description: Erro interno do servidor
 * 
 */
routes.get('/creators/mostcreations', creatorController.getCreatorWithTheMostCreations);

/**
 * @swagger
 * /creators/create:
 *  post:
 *      tags:
 *          - Creators
 *      description: Criar um creator
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: creator
 *            description: Creator to be created
 *            in: body
 *            required: true
 *            schema:
 *              $ref: '#/components/schemas/Creator'
 *      responses:
 *          200:
 *              description: Creator criado com sucesso
 *          400:
 *              description: Informações incompletas
 *          409:
 *              description: Creator api id já existe no banco de dados
 *          500: 
 *              description: Erro interno do servidor
 */
routes.post('/creators/create', creatorController.create);

/**
 * @swagger
 * /creators/delete:
 *  delete:
 *      tags:
 *          - Creators
 *      description: Deletar um creator
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: deletecreator
 *            description: Id do Creator
 *            in: body
 *            required: true
 *            schema:
 *              $ref: '#/components/schemas/DeleteCreator'
 *      responses:
 *          200:
 *              description: Creator deletado com sucesso
 *          404:
 *              description: Creator não encontrada
 *          500:
 *              description: Não foi possível deletar o creator
 */
routes.delete('/creators/delete', creatorController.delete);

/**
 * @swagger
 * /creators/update:
 *  put:
 *      tags:
 *          - Creators
 *      description: Atualizar um creator
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: updatecreator
 *            description: Creator e campos a serem atualizados
 *            in: body
 *            required: true
 *            schema:
 *              $ref: '#/components/schemas/UpdateCreator'
 *      responses:
 *          200:
 *              description: Creator atualizado com sucesso
 *          400:
 *              description: |
 *                  Solicitação inválida
 *                  - Creator não encontrado
 *                  - Quando há detail, não pode ser vazio
 *                  - Full Name não pode ser vazio
 *          409:
 *              description: O id da api do creator já está em uso
 *          500:
 *              description: Não foi possível atualizar o creator
 */
routes.put('/creators/update', creatorController.update);

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