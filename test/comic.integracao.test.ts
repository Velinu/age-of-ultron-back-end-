import { HttpStatus } from "../src/enums/http-status.enum";
import app from "../app";
import supertest from "supertest";

describe('Comic E2E Testing', () => {
    const request = supertest(app);
    it('Should be populate database with comic', async () => {
        const result = await request.get('/events/comics/create/314').timeout({ response: 15000 })
        const find = await request.get('/comics/getnames');
        expect(result.statusCode).toEqual(HttpStatus.OK);
        expect(find.body.data.length).toBeGreaterThan(0);
    })

    it('Should get comic with highest page count', async () => {
        const result = await request.get('/comics/highestpages');
        expect(result.statusCode).toEqual(HttpStatus.OK);
        expect(result.body.data).toBeDefined();
    })

    it('Should get comic by id (api id or mongo id)', async () => {
        const comic = await request.post('/comics/create').send({
            "id": 1,
            "title": "Comic title",
            "description": "Comic Description",
            "publication": "2024-05-03T05:16:21.009Z",
            "thumbnail": "http://i.annihil.us/u/prod/marvel/i/mg/7/70/5159b4df9e785.jpg",
            "pageCount": 32
        })

        const result1 = await request.get(`/comics/get/${comic.body.data._id}`);
        const result2 = await request.get(`/comics/get/${comic.body.data.id}`);

        await request.delete('/comics/delete').send({ id: comic.body.data._id })

        expect(result1.statusCode).toEqual(HttpStatus.OK)
        expect(result2.statusCode).toEqual(HttpStatus.OK)
        expect(result1.body.data._id).toEqual(comic.body.data._id);
        expect(result2.body.data._id).toEqual(comic.body.data._id);

    })

    it('Should be get all comics name', async () => {
        const result = await request.get('/comics/getnames');

        expect(result.statusCode).toEqual(HttpStatus.OK);
        expect(result.body.data.length).toBeGreaterThan(0);
    })

    it('Should be create comic', async () => {
        const create = await request.post('/comics/create').send({
            "id": 1,
            "title": "Comic title",
            "description": "Comic Description",
            "publication": "2024-05-03T05:16:21.009Z",
            "thumbnail": "http://i.annihil.us/u/prod/marvel/i/mg/7/70/5159b4df9e785.jpg",
            "pageCount": 32
        })

        const find = await request.get(`/comics/get/${create.body.data._id}`);
        await request.delete('/comics/delete').send({ id: create.body.data._id });

        expect(create.statusCode).toEqual(HttpStatus.OK);
        expect(find.body.data._id).toEqual(create.body.data._id);
    })

    it('Should be update comic', async () => {
        const create = await request.post('/comics/create').send({
            "id": 1,
            "title": "Comic title",
            "description": "Comic Description",
            "publication": "2024-05-03T05:16:21.009Z",
            "thumbnail": "http://i.annihil.us/u/prod/marvel/i/mg/7/70/5159b4df9e785.jpg",
            "pageCount": 32
        })

        const update = await request.put('/comics/update').send({
            "_id": create.body.data._id,
            "id": 555555,
            "title": "a",
            "description": "b",
            "publication": "2020-05-03T05:16:21.009Z",
            "thumbnail": "c",
            "pageCount": 2
        })

        const find = await request.get(`/comics/get/${create.body.data._id}`);
        await request.delete('/comics/delete').send({ id: create.body.data._id });

        expect(update.statusCode).toEqual(HttpStatus.OK);
        expect(find.body.data._id).toEqual(create.body.data._id);
        expect(find.body.data.id).toEqual(555555);
        expect(find.body.data.title).toEqual('a');
        expect(find.body.data.description).toEqual('b');
        expect(find.body.data.publication).toEqual("2020-05-03T05:16:21.009Z");
        expect(find.body.data.thumbnail).toEqual('c');
        expect(find.body.data.pageCount).toEqual(2);
    })

    it('Should be delete comic', async () => {
        const create = await request.post('/comics/create').send({
            "id": 1,
            "title": "Comic title",
            "description": "Comic Description",
            "publication": "2024-05-03T05:16:21.009Z",
            "thumbnail": "http://i.annihil.us/u/prod/marvel/i/mg/7/70/5159b4df9e785.jpg",
            "pageCount": 32
        })

        const find1 = await request.get(`/comics/get/${create.body.data._id}`);
        const del = await request.delete('/comics/delete').send({ id: create.body.data._id });
        const find2 = await request.get(`/comics/get/${create.body.data._id}`);

        expect(create.statusCode).toEqual(HttpStatus.OK);
        expect(find1.body.data._id).toEqual(create.body.data._id);
        expect(del.statusCode).toEqual(HttpStatus.OK);
        expect(find2.statusCode).toEqual(HttpStatus.NOT_FOUND);
    })

    it('Should be get creator with most reations', async () => {
        const result = await request.get('/creators/mostcreations');

        expect(result.statusCode).toEqual(HttpStatus.OK);
        expect(result.body.data.length).toBeGreaterThan(0);
    })
})