import { Document, Schema, model } from 'mongoose'
import { Collections } from '../enums/collections.enum'
import { Event } from '../interfaces/event.interface';
import { Storie } from '../interfaces/stories.interface';

export type StoriesDocument = Storie & Document;

const StoriesSchema = new Schema({
    id: {
        type: Number,
        required: [true, 'id']
    },
    title: {
        type: String,
        required: [true, 'title']
    },
    description: {
        type: String,
        default: ''
    },
    resourceURI: {
        type: String,
        required: [true, 'resourceURI']
    },
    type: {
        type: String,
        required: [true, 'type']
    },
    modified: {
        type: Date,
        required: [true, 'modified']
    },
    thumbnail: {
        type: String || null,
        default: ''
    },
    creators: [
        {
            id: {
                type: Number,
                required: [true, 'creators.id']
            }
        }
    ],
    characters: [
        {
            id: {
                type: Number,
                required: [true, 'characters.id']
            }
        }
    ],
    series: [
        {
            id: {
                type: Number,
                required: [true, 'series.id']
            }
        }
    ],
    comics: [
        {
            id: {
                type: Number,
                required: [true, 'comics.id']
            }
        }
    ],
    events: [
        {
            id: {
                type: Number,
                required: [true, 'events.id']
            }
        }
    ]
}, {
    timestamps: true,
});

export default model<StoriesDocument>(Collections.STORIES_SCHEMA, StoriesSchema);