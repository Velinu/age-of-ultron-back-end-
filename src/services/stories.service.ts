import { Errors } from "../enums/errors.enum";
import { HttpStatus } from "../enums/http-status.enum";
import { Messages } from "../enums/messages.enum";
import { EventRepository } from "../repositories/event.repository";
import { StorieRepository } from "../repositories/storie.repository";
import { MarvelApi } from "../useApi/marvel.useapi";
import { ServiceData } from "../utils/service-data";

class StorieService {
    private readonly repository = new StorieRepository();
    private marvelApi = new MarvelApi();

    async create(eventId: number) {
        const stories = await this.marvelApi.getStoriesByEvent(eventId);

        if (stories) {
            console.log(stories[0])
            console.log(stories[1])
            stories.forEach(async (storie) => {
                const exists = await this.repository.findByStorieId(storie.id);
                if (exists == null) {
                    this.repository.create(storie);
                }
            })

            return new ServiceData(
                HttpStatus.OK
            )
        }

        return new ServiceData(
            HttpStatus.NOT_FOUND
        )
    }

}

export default new StorieService();