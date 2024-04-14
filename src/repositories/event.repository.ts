import { GenericRepository } from "./generic/generic-repository.repository";
import { EventDocument } from '../schemas/event.schema'
import eventModel from '../schemas/event.schema'

export class EventRepository extends GenericRepository<EventDocument> {
    constructor() {
        super(eventModel);
    }

    async findByEventId(id: number) {
        return this.findOne({ id: id })
            .then((res) => {
                return res;
            })
            .catch(() => {
                return null;
            })
    }
}