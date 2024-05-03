import { Document, Schema, model } from 'mongoose'
import { Collections } from '../enums/collections.enum'
import { ComicInterface } from '../interfaces/comic.interface';

export type ComicDocument = ComicInterface & Document;

const ComicSchema = new Schema({
    id: {
        type: Number
    },
    title: {
        type: String,
        required: [true, 'title']
    },
    description: {
        type: String,
        required: [true, 'description']
    },
    publication: {
        type: Date,
        required: [true, 'publication']
    },
    thumbnail: {
        type: String,
        required: [true, 'thumbnail']
    },
    pageCount: {
        type: Number,
        required: [true, 'pageCount']
    }
}, {
    timestamps: true,
});

export default model<ComicDocument>(Collections.COMIC_SCHEMA, ComicSchema);