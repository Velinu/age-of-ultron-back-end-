import { HttpStatus } from "../src/enums/http-status.enum";
import app from "../app";
import supertest from "supertest";

describe('Creator E2E Testing', () => {
    const request = supertest(app);
    it('Shoud populate database with creator', async () => {
        const result = await request.get('/events/creators/create/314').timeout({ response: 15000 })
        const find = await request.get('/creators/getall');
        expect(result.statusCode).toEqual(HttpStatus.OK);
        expect(find.body.data.length).toBeGreaterThan(0);
    })


    it('Should get creator by id (api id or mongo id)', async () => {
        const creator = await request.post('/creators/create').send({
            "id": 34,
            "fullName": "Creator Full Name",
            "comics": [
                {
                    "id": 234,
                    "name": "Comic Name"
                }
            ],
            "series": 200,
            "stories": 145,
            "events": 4,
            "detail": "https://detailurl.com"
        })

        const result1 = await request.get(`/creators/get/${creator.body.data._id}`);
        const result2 = await request.get(`/creators/get/${creator.body.data.id}`);

        await request.delete('/creators/delete').send({ id: creator.body.data._id })

        expect(result1.statusCode).toEqual(HttpStatus.OK)
        expect(result2.statusCode).toEqual(HttpStatus.OK)
        expect(result1.body.data._id).toEqual(creator.body.data._id);
        expect(result2.body.data._id).toEqual(creator.body.data._id);

    })

    it('Should be create creator', async () => {
        const create = await request.post('/creators/create').send({
            "id": 34,
            "fullName": "Creator Full Name",
            "comics": [
                {
                    "id": 234,
                    "name": "Comic Name"
                }
            ],
            "series": 200,
            "stories": 145,
            "events": 4,
            "detail": "https://detailurl.com"
        })

        const find = await request.get(`/creators/get/${create.body.data._id}`);
        await request.delete('/creators/delete').send({ id: create.body.data._id });

        expect(create.statusCode).toEqual(HttpStatus.OK);
        expect(find.body.data._id).toEqual(create.body.data._id);
    })

    it('Should be update creator', async () => {
        const create = await request.post('/creators/create').send({
            "id": 34,
            "fullName": "Creator Full Name",
            "comics": [
                {
                    "id": 234,
                    "name": "Comic Name"
                }
            ],
            "series": 200,
            "stories": 145,
            "events": 4,
            "detail": "https://detailurl.com"
        })

        const update = await request.put('/creators/update').send({
            "_id": create.body.data._id,
            "id": 555555,
            "fullName": "a",
            "comics": [
                {
                    "id": 234,
                    "name": "Comic Name"
                },
                {
                    "id": 456,
                    "name": "name"
                }
            ],
            "series": 1,
            "stories": 2,
            "events": 3,
            "detail": "https://detailurl.com2"
        })

        const find = await request.get(`/creators/get/${create.body.data._id}`);
        await request.delete('/creators/delete').send({ id: create.body.data._id });

        expect(update.statusCode).toEqual(HttpStatus.OK);
        expect(find.body.data._id).toEqual(create.body.data._id);
        expect(find.body.data.id).toEqual(555555);
        expect(find.body.data.fullName).toEqual('a');
        expect(find.body.data.comics).toEqual([
            {
                "id": 234,
                "name": "Comic Name"
            },
            {
                "id": 456,
                "name": "name"
            }
        ]);
        expect(find.body.data.series).toEqual(1);
        expect(find.body.data.stories).toEqual(2);
        expect(find.body.data.events).toEqual(3);
        expect(find.body.data.detail).toEqual("https://detailurl.com2");
    })

    it('Should be delete creator', async () => {
        const create = await request.post('/creators/create').send({
            "id": 34,
            "fullName": "Creator Full Name",
            "comics": [
                {
                    "id": 234,
                    "name": "Comic Name"
                }
            ],
            "series": 200,
            "stories": 145,
            "events": 4,
            "detail": "https://detailurl.com"
        })

        const find1 = await request.get(`/creators/get/${create.body.data._id}`);
        const del = await request.delete('/creators/delete').send({ id: create.body.data._id });
        const find2 = await request.get(`/creators/get/${create.body.data._id}`);

        expect(create.statusCode).toEqual(HttpStatus.OK);
        expect(find1.body.data._id).toEqual(create.body.data._id);
        expect(del.statusCode).toEqual(HttpStatus.OK);
        expect(find2.statusCode).toEqual(HttpStatus.NOT_FOUND);
    })
})