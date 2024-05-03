export enum Errors {
    INVALID_EMAIL_ADDRESS = "Invalid Email Address",
    INVALID_EMAIL_ADDRESS_OR_PASSWORD = "Invalid Email Address or Password",
    INVALID_PHOTO_URL = "Invalid Photo URL",
    EMAIL_ALREADY_IN_USE = "Email Already In Use",
    PASSWORD_LENGTH = "Password Must Be 8 Or More Characters Long",
    MISSING_USER_INFORMATIONS = "Can't Create User: Informations Missing",

    EVENT_ALREADY_EXISTS = 'Event Already Exists',

    NO_CHARACTERS_FOUND = 'No Character found',
    POST_CHARACTER = "Unable to Create new Character",
    MISSING_FIELDS = "Unable to create element, missing fields: ",
    PATCH_CHARACTER = "Unable to Create update Character",
    DELETE_CHARACTER = "Unable to delete Character",

    COMIC_ID_ALREADY_IN_USE = 'There is already a comic with this id in the system',
    COMIC_NOT_FOUND = 'Comic Not Found',
    INCORRECT_COMIC_TITLE = 'Incorrect Comic Title',
    INCORRECT_COMIC_DESCRIPTION = 'Incorrect Comic Description',
    MISSING_COMIC_INFORMATIONS = 'Missing Comic Informations',

    CREATOR_ID_ALREADY_IN_USE = 'There is already a creator with this id in the system',
    MISSING_CREATOR_INFORMATIONS = 'Missing Creator Informations',
    CREATOR_NOT_FOUND = 'Creator Not Found',
    CREATOR_DETAIL_EMPTY = 'Empty Creator Detail',
    CREATOR_FULLNAME_EMPTY = 'Creator Full Name Empty',
    CREATOR_ALREADY_EXISTS = 'Creator Already Exists',
    CREATORS_NOT_FOUND = 'Creators Not Found',

}