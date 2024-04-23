interface Creators {
    id: number
}

interface Characters {
    id: number
}

interface Series {
    id: number
}

interface Comics {
    id: number
}

interface Events {
    id: number
}

export interface Storie {
    id: number
    title: string
    description: string
    resourceURI: string
    type: string
    modified: Date
    thumbnail: string
    creators: Array<Creators>
    characters: Array<Characters>
    series: Array<Series>
    comics: Array<Comics>
    events: Array<Events>
}