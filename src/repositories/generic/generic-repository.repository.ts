import { Aggregate, AggregateOptions, Document, FilterQuery, Model, MongooseBaseQueryOptions, PipelineStage, ProjectionType, UpdateQuery, UpdateWithAggregationPipeline, UpdateWriteOpResult } from "mongoose";

export class GenericRepository<T extends Document> {

    constructor(private model: Model<T>) { }

    async count(filter: FilterQuery<T>) {
        return await this.model.countDocuments(filter);
    }

    async delete(filter?: FilterQuery<T>) {
        return this.model.deleteOne(filter);
    }

    async create(data: Partial<T>): Promise<T> {
        return await this.model.create(data);
    }

    async find(filter: FilterQuery<T>, projection?: ProjectionType<T> | null | undefined): Promise<T[] | null> {
        return await this.model.find(filter, projection);
    }

    async findOne(filter: FilterQuery<T>): Promise<T | null> {
        return await this.model.findOne(filter);
    }

    async findById(id: string): Promise<T | null> {
        return await this.model.findById(id);
    }

    async findByIdAndUpdate(id: string, update: Partial<T>): Promise<T | null> {
        return await this.model.findByIdAndUpdate(id, update, { new: true });
    }

    async findByIdAndDelete(id: string): Promise<T | null> {
        return await this.model.findByIdAndDelete(id);
    }

    async deleteOne(filter: FilterQuery<T>, update: UpdateWithAggregationPipeline | UpdateQuery<T>) {
        return await this.model.deleteOne(filter, update);
    }

    async updateOne(filter: FilterQuery<T>, update: UpdateWithAggregationPipeline | UpdateQuery<T>): Promise<UpdateWriteOpResult> {
        return await this.model.updateOne(filter, update);
    }
    async aggregate(pipeline?: PipelineStage[] | undefined, options?: AggregateOptions | undefined): Promise<Aggregate<any[]> | null> {
        return this.model.aggregate(pipeline, options)
            .then((res) => {
                return res;
            })
            .catch(() => {
                return null;
            })
    }

    async insertMany(docs: T[]) {
        return this.model.insertMany(docs)
            .then((res) => {
                return res;
            })
            .catch(() => {
                return null;
            })
    }

    async findMostComics(): Promise<T | null> {
        return await this.model.findOne({})
            .sort({ 'comics.available': -1 })
            .exec()
    }

    async findWithMostEvents(): Promise<T | null> {
        return await this.model.findOne({})
            .sort({ 'events.available': -1 })
            .exec()
    }

    async findWithMostSeries(): Promise<T | null> {
        return await this.model.findOne({})
            .sort({ 'series.available': -1 })
            .exec()
    }
}