import { Document, Schema, model } from 'mongoose'
import { Collections } from '../enums/collections.enum'
import { Creator } from '../interfaces/creator.interface';

export type CreatorDocument = Creator & Document;

const CreatorSchema = new Schema({
    id: {
        type: Number,
        required: [true, 'id']
    },
    firstName: {
        type: String,
        required: [true, 'firstName']
    },
    middleName: String,
    lastName: {
        type: String,
        required: [true, 'lastName']
    },
    suffix: String,
    fullName: {
        type: String,
        required: [true, 'fullName']
    },
    modified: {
        type: Date,
        required: [true, 'modified']
    },
    thumbnail: [
        {
            path: {
                type: String,
                required: [true, 'thumbnail.path']
            },
            extension: {
                type: String,
                required: [true, 'thumbnail.extension']
            }
        }
    ],
    resourceURI: {
        type: String,
        required: [true, 'resourceURI']
    },

    urls: [
        {
            type: {
                type: String,
                required: [true, 'urls.type']
            },
            url: {
                type: String,
                required: [true, 'urls.url']
            }
        }
    ]
}, {
    timestamps: true,
});

export default model<CreatorDocument>(Collections.CREATOR_SCHEMA, CreatorSchema);