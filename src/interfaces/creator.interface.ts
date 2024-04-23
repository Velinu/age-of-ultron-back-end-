interface Urls {
    type: String
    url: String
}

interface Thumbnail {
    path: string,
    extension: string
}

export interface Creator {
    id: number
    firstName: String
    middleName?: String
    lastName: String
    suffix?: String
    fullName: String
    modified: Date
    thumbnail: Array<Thumbnail>
    resourceURI: String
    urls: Array<Urls>
    createdAt: Date
    updatedAt: Date
}