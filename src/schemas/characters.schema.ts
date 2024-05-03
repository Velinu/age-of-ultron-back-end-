import { Document, Schema, model } from 'mongoose'
import { Collections } from '../enums/collections.enum'
import { Character } from '../interfaces/character.interface';

export type CharacterDocument = Character & Document;

const CharacterSchema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: [true, 'name']
    },
    description: {
        type: String,
        
    },
    modified: {
        type: Date,
    },
    thumbnail: {
        path: {
            type: String,
            required: [true, 'thumbnail.path']
        },
        extension: {
            type: String,
            required: [true, 'thumbnail.extension']
        }
    },
    comics: {
        available: {
            type: Number,
            required: [true, 'comics.available']
        },
        items: [
            {
                id: {
                    type: Number,
                },
                title: {
                    type: String,
                    required: [true, 'comics.items.title']
                },
            }
        ]
    },
    series: {
        available: {
            type: Number,
            required: [true, 'series.available']
        },
        items: [
            {
                id: {
                    type: Number,
                },
                name: {
                    type: String,
                    required: [true, 'series.items.name']
                },
            }
        ]
    },
    stories: {
        available: {
            type: Number,
            required: [true, 'stories.available']
        },
        items: [
            {
                id: {
                    type: Number,
                },
                name: {
                    type: String,
                    required: [true, 'stories.items.name']
                },
                type: {
                    type: String,
                    required: [true, 'stories.items.type']
                }
            }
        ]
    },
    events: {
        available: {
            type: Number,
            required: [true, 'events.available']
        },
        items: [
            {
                id: {
                    type: Number,
                },
                name: {
                    type: String,
                    required: [true, 'events.items.name']
                },
            }
        ]
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
    ],
}, {
    timestamps: true,
    versionKey: false
});

export default model<CharacterDocument>(Collections.CHARACTER_SCHEMA, CharacterSchema);