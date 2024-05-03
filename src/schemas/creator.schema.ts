import { Document, Schema, model } from 'mongoose'
import { Collections } from '../enums/collections.enum'
import { CreatorInterface } from '../interfaces/creator.interface';

export type CreatorDocument = CreatorInterface & Document;

const CreatorSchema = new Schema({
    id: {
        type: Number
    },
    fullName: {
        type: String,
        required: [true, 'fullName']
    },
    comics: {
        available: {
            type: Number,
        },
        comic: [
            {
                id: {
                    type: Number,
                },
                name: {
                    type: String,
                }
            }
        ]
    },
    series: {
        type: Number,
    },
    stories: {
        type: Number,
    },
    events: {
        type: Number,
    },
    detail: {
        type: String,
    }

}, {
    timestamps: true,
});

export default model<CreatorDocument>(Collections.CREATOR_SCHEMA, CreatorSchema);