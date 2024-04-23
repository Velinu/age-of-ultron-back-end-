import { Document, Schema, model } from 'mongoose'
import { Collections } from '../enums/collections.enum'
import { Event } from '../interfaces/event.interface';

export type EventDocument = Event & Document;

const EventSchema = new Schema({
    id: {
        type: Number,
        required: [true, 'id'],
    },
    title: {
        type: String,
        required: [true, 'title']
    },
    description: {
        type: String,
        required: [true, 'description']
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
    modified: {
        type: Date,
        required: [true, 'modified']
    },
    start: {
        type: Date,
        required: [true, 'start']
    },
    end: {
        type: Date,
        required: [true, 'end']
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
    stories: [
        {
            id: {
                type: Number,
                required: [true, 'comics.id']
            }
        }
    ],
    // creators: {
    //     available: {
    //         type: Number,
    //         required: [true, 'creators.available']
    //     },
    //     collectionURI: {
    //         type: String,
    //         required: [true, 'creators.collectionURI']
    //     },
    //     items: [
    //         {
    //             resourceURI: {
    //                 type: String,
    //                 required: [true, 'creators.items.resourceURI']
    //             },
    //             name: {
    //                 type: String,
    //                 required: [true, 'creators.items.name']
    //             },
    //             role: {
    //                 type: String,
    //                 required: [true, 'creators.items.role']
    //             }
    //         }
    //     ]
    // },
    // characters: {
    //     available: {
    //         type: Number,
    //         required: [true, 'characters.available']
    //     },
    //     collectionURI: {
    //         type: String,
    //         required: [true, 'characters.collectionURI']
    //     },
    //     items: [
    //         {
    //             resourceURI: {
    //                 type: String,
    //                 required: [true, 'characters.items.resourceURI']
    //             },
    //             name: {
    //                 type: String,
    //                 required: [true, 'characters.items.name']
    //             },
    //         }
    //     ]
    // },
    // stories: {
    //     available: {
    //         type: Number,
    //         required: [true, 'stories.available']
    //     },
    //     collectionURI: {
    //         type: String,
    //         required: [true, 'stories.collectionURI']
    //     },
    //     items: [
    //         {
    //             resourceURI: {
    //                 type: String,
    //                 required: [true, 'stories.items.resourceURI']
    //             },
    //             name: {
    //                 type: String,
    //                 required: [true, 'stories.items.name']
    //             },
    //             type: {
    //                 type: String,
    //                 required: [true, 'stories.items.type']
    //             }
    //         }
    //     ]
    // },
    // comics: {
    //     available: {
    //         type: Number,
    //         required: [true, 'comics.available']
    //     },
    //     collectionURI: {
    //         type: String,
    //         required: [true, 'comics.collectionURI']
    //     },
    //     items: [
    //         {
    //             resourceURI: {
    //                 type: String,
    //                 required: [true, 'comics.items.resourceURI']
    //             },
    //             name: {
    //                 type: String,
    //                 required: [true, 'comics.items.name']
    //             },
    //         }
    //     ]
    // },
    // series: {
    //     available: {
    //         type: Number,
    //         required: [true, 'series.available']
    //     },
    //     collectionURI: {
    //         type: String,
    //         required: [true, 'series.collectionURI']
    //     },
    //     items: [
    //         {
    //             resourceURI: {
    //                 type: String,
    //                 required: [true, 'series.items.resourceURI']
    //             },
    //             name: {
    //                 type: String,
    //                 required: [true, 'series.items.name']
    //             },
    //         }
    //     ]
    // }
}, {
    timestamps: true,
});

export default model<EventDocument>(Collections.EVENT_SCHEMA, EventSchema);