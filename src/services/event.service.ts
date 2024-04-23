import { Errors } from "../enums/errors.enum";
import { HttpStatus } from "../enums/http-status.enum";
import { Messages } from "../enums/messages.enum";
import { EventRepository } from "../repositories/event.repository";
import { MarvelApi } from "../useApi/marvel.useapi";
import { ServiceData } from "../utils/service-data";

class EventService {
    private readonly repository = new EventRepository();
    private marvelApi = new MarvelApi();

    async create(body: any) {
        const event = await this.repository.findByEventId(body.id);
        if (event) {
            return new ServiceData(
                HttpStatus.BAD_REQUEST,
                Errors.EVENT_ALREADY_EXISTS
            )
        }

        const eventResult = await this.marvelApi.getEvent(body.id);

        if (!eventResult) {
            return new ServiceData(
                HttpStatus.NOT_FOUND
            )
        }

        return this.repository.create(eventResult)
            .then(() => {

                return new ServiceData(
                    HttpStatus.OK,
                    Messages.CREATE_EVENT_SUCCESSFULLY
                )
            })
            .catch(() => {
                return new ServiceData(
                    HttpStatus.INTERNAL_SERVER_ERROR
                )
            })
    }

}

export default new EventService();