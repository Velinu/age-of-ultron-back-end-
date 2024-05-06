import { Router } from 'express'
import creatorController from '../controllers/creator.controller';
import comicController from '../controllers/comic.controller';
import characterController from '../controllers/character.controller';

const routes = Router();

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

routes.get('/characters/create/:id', characterController.create)
/**
 * @swagger
 * /characters/create/{eventId}:
 *  get:
 *      tags:
 *          - Characters
 *      description: Criar personagem por evento
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: eventId
 *            required: true
 *      responses:
 *          200:
 *              description: Criar personagens de um evento
 *          400:
 *              description: eventId inválido ou não encontrado
 * 
 */

routes.get('/characters/:id', characterController.getCharacterById)
/**
 * @swagger
 * /characters/{charId}:
 *  get:
 *      tags:
 *          - Characters
 *      description: Buscar personagem por Id
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: charId
 *            required: true
 *      responses:
 *          200:
 *              description: Encontra personagem por Id
 *          400:
 *              description: charId inválido ou não encontrado
 * 
 */

routes.get('/characters', characterController.getAllCharacters)
/**
 * @swagger
 *  /characters:
 *  get:
 *      tags:
 *          - Characters
 *      description: Buscar todos os personagens
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Encontra todos os personagens
 *          400:
 *              description: Nenhum personagem encontrado
 * 
 */

routes.get('/characters/extra/mostComics', characterController.getMostComics)
/**
 * @swagger
 *  /characters/extra/mostComics:
 *  get:
 *      tags:
 *          - Characters
 *      description: Buscar personagem com mais Comics
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Encontra personagem personagem com mais Comics
 *          400:
 *              description: Nenhum personagem encontrado
 * 
 */

routes.get('/characters/extra/mostEvents', characterController.getMostEvents)
/**
 * @swagger
 * /characters/extra/mostEvents:
 *  get:
 *      tags:
 *          - Characters
 *      description: Buscar personagem com mais eventos
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Encontra personagem com mais eventos
 *          400:
 *              description: Nenhum personagem encontrado
 * 
 */

routes.get('/characters/extra/mostSeries', characterController.getMostSeries)
/**
 * @swagger
 *  /characters/extra/mostSeries:
 *  get:
 *      tags:
 *          - Characters
 *      description: Buscar personagem com mais Series
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Encontra personagem personagem com mais Series
 *          400:
 *              description: Nenhum personagem encontrado
 * 
 */

routes.post('/characters', characterController.postCharacter)
/**
 * @swagger
 * /characters:
 *  post:
 *      tags:
 *          - Characters
 *      description: Criar um personagem
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: "body"
 *            name: "character"
 *            description: "Informações do personagem a ser criado"
 *            required: true
 *            schema:
 *              type: "object"
 *              properties:
 *                name:
 *                  type: "string"
 *                  description: "Nome do personagem"
 *                description:
 *                  type: "string"
 *                  description: "Descrição do personagem"
 *                modified:
 *                  type: "string"
 *                  format: "date-time"
 *                  description: "Data de última modificação"
 *                thumbnail:
 *                  type: "object"
 *                  properties:
 *                    path:
 *                      type: "string"
 *                      description: "Caminho para a imagem do personagem"
 *                    extension:
 *                      type: "string"
 *                      description: "Extensão da imagem"
 *                comics:
 *                  type: "object"
 *                  properties:
 *                    available:
 *                      type: "integer"
 *                      description: "Número de quadrinhos disponíveis"
 *                    items:
 *                      type: "array"
 *                      items:
 *                        type: "object"
 *                        properties:
 *                          title:
 *                            type: "string"
 *                            description: "Título do quadrinho"
 *                series:
 *                  type: "object"
 *                  properties:
 *                    available:
 *                      type: "integer"
 *                      description: "Número de séries disponíveis"
 *                    items:
 *                      type: "array"
 *                      items:
 *                        type: "object"
 *                        properties:
 *                          name:
 *                            type: "string"
 *                            description: "Nome da série"
 *                stories:
 *                  type: "object"
 *                  properties:
 *                    available:
 *                      type: "integer"
 *                      description: "Número de histórias disponíveis"
 *                    items:
 *                      type: "array"
 *                      items:
 *                        type: "object"
 *                        properties:
 *                          name:
 *                            type: "string"
 *                            description: "Nome da história"
 *                          type:
 *                            type: "string"
 *                            description: "Tipo da história"
 *                events:
 *                  type: "object"
 *                  properties:
 *                    available:
 *                      type: "integer"
 *                      description: "Número de eventos disponíveis"
 *                    items:
 *                      type: "array"
 *                      items:
 *                        type: "object"
 *                        properties:
 *                          name:
 *                            type: "string"
 *                            description: "Nome do evento"
 *                urls:
 *                  type: "array"
 *                  items:
 *                    type: "object"
 *                    properties:
 *                      type:
 *                        type: "string"
 *                        description: "Tipo de URL"
 *                      url:
 *                        type: "string"
 *                        description: "Endereço da URL"
 *      responses:
 *          200:
 *              description: Personagem criado com sucesso
 *          400:
 *              description: Não foi possível criar o personagem
 * 
 */
routes.patch('/characters/:id', characterController.patchCharacter)
/**
 * @swagger
 * /characters/{charId}:
 *  patch:
 *      tags:
 *          - Characters
 *      description: Edita um personagem
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: charId
 *            required: true
 *          - in: "body"
 *            name: "character"
 *            description: "Informações do personagem a ser editado"
 *            required: true
 *            schema:
 *              type: "object"
 *              properties:
 *                name:
 *                  type: "string"
 *                  description: "Nome do personagem"
 *                description:
 *                  type: "string"
 *                  description: "Descrição do personagem"
 *                modified:
 *                  type: "string"
 *                  format: "date-time"
 *                  description: "Data de última modificação"
 *                thumbnail:
 *                  type: "object"
 *                  properties:
 *                    path:
 *                      type: "string"
 *                      description: "Caminho para a imagem do personagem"
 *                    extension:
 *                      type: "string"
 *                      description: "Extensão da imagem"
 *                comics:
 *                  type: "object"
 *                  properties:
 *                    available:
 *                      type: "integer"
 *                      description: "Número de quadrinhos disponíveis"
 *                    items:
 *                      type: "array"
 *                      items:
 *                        type: "object"
 *                        properties:
 *                          title:
 *                            type: "string"
 *                            description: "Título do quadrinho"
 *                series:
 *                  type: "object"
 *                  properties:
 *                    available:
 *                      type: "integer"
 *                      description: "Número de séries disponíveis"
 *                    items:
 *                      type: "array"
 *                      items:
 *                        type: "object"
 *                        properties:
 *                          name:
 *                            type: "string"
 *                            description: "Nome da série"
 *                stories:
 *                  type: "object"
 *                  properties:
 *                    available:
 *                      type: "integer"
 *                      description: "Número de histórias disponíveis"
 *                    items:
 *                      type: "array"
 *                      items:
 *                        type: "object"
 *                        properties:
 *                          name:
 *                            type: "string"
 *                            description: "Nome da história"
 *                          type:
 *                            type: "string"
 *                            description: "Tipo da história"
 *                events:
 *                  type: "object"
 *                  properties:
 *                    available:
 *                      type: "integer"
 *                      description: "Número de eventos disponíveis"
 *                    items:
 *                      type: "array"
 *                      items:
 *                        type: "object"
 *                        properties:
 *                          name:
 *                            type: "string"
 *                            description: "Nome do evento"
 *                urls:
 *                  type: "array"
 *                  items:
 *                    type: "object"
 *                    properties:
 *                      type:
 *                        type: "string"
 *                        description: "Tipo de URL"
 *                      url:
 *                        type: "string"
 *                        description: "Endereço da URL"
 *      responses:
 *          200:
 *              description: Personagem criado com sucesso
 *          400:
 *              description: Não foi possível editar o personagem
 * 
 */

routes.delete('/characters/:id', characterController.deleteCharacter)
/**
 * @swagger
 * /characters/{charId}:
 *  delete:
 *      tags:
 *          - Characters
 *      description: Excluir um personagem
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: charId
 *            required: true
 *      responses:
 *          200:
 *              description: Exluir um personagem
 *          400:
 *              description: charId inválido ou não encontrado
 * */
export {
    routes
}