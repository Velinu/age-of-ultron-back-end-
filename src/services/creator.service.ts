import { CreateCreatorDto } from "../dtos/creator/create-creator.dto";
import { Errors } from "../enums/errors.enum";
import { HttpStatus } from "../enums/http-status.enum";
import { Messages } from "../enums/messages.enum";
import { CreatorRepository } from "../repositories/creator.repository";
import { EventRepository } from "../repositories/event.repository";
import { MarvelApi } from "../useApi/marvel.useapi";
import { ServiceData } from "../utils/service-data";

class CreatorService {
    private readonly repository = new CreatorRepository();
    private marvelApi = new MarvelApi();

    // fazer a rota de puxar o evento trazer e guardar somente o nome e o id do creator, referenciando essa tabela aqui
    async create(body: CreateCreatorDto) {
        const creators = await this.marvelApi.getCreatorsByEvent(body.id);

        if (creators) {
            creators.forEach(async (creator) => {
                return this.repository.findByCreatorId(creator.id)
                    .then((res) => {
                        if (res) { return }
                        this.repository.create(creator);
                    })
            })

            return new ServiceData(
                HttpStatus.OK
            )
        }

        return new ServiceData(
            HttpStatus.BAD_REQUEST
        )
    }


    async getCreatorsForAllStories() {

    }

}

export default new CreatorService();