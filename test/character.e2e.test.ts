import { describe, it, expect } from "@jest/globals";
import request from 'supertest';
import app from "../app";
import { HttpStatus } from "../src/enums/http-status.enum";

describe('Character E2E Testing', () => {
    it('Populate DB (success)', async () => {
        const res = await request(app).get('/characters/create/314')
        expect(res.statusCode).toEqual(HttpStatus.OK);
        expect(res.body).toEqual({"message": "Create characters Successfully"})
    })

    it('Get By Id (Success)', async () => {
        const res = await request(app).get('/characters/1009685')
        expect(res.statusCode).toEqual(HttpStatus.OK);
        expect(Object.keys(res.body).length).toBeGreaterThan(0)
    })

    it('Get By Id (Failed)', async () => {
        const res = await request(app).get('/characters/1009685777')
        expect(res.statusCode).toEqual(HttpStatus.BAD_REQUEST);
        expect(res.body).toEqual({"message": "No Character found"})
    })

    it('Get All', async () => {
        const res = await request(app).get('/characters')
        expect(res.statusCode).toEqual(HttpStatus.OK);
        expect(Object.keys(res.body).length).toBeGreaterThan(0)
    })

    it(`Get Most Comic character`,async () => {
        const res = await request(app).get('/characters/extra/mostComics')
        expect(res.statusCode).toEqual(HttpStatus.OK);
        expect(Object.keys(res.body).length).toBeGreaterThan(0)
    })

    it(`Get Most Event character`,async () => {
        const res = await request(app).get('/characters/extra/mostEvents')
        expect(res.statusCode).toEqual(HttpStatus.OK);
        expect(Object.keys(res.body).length).toBeGreaterThan(0)
    })

    it(`Get Most Event Series`,async () => {
        const res = await request(app).get('/characters/extra/mostSeries')
        expect(res.statusCode).toEqual(HttpStatus.OK);
        expect(Object.keys(res.body).length).toBeGreaterThan(0)
    })

    it(`Post character (success)`,async () => {
        const res = await request(app).post('/characters')
        .send({
            "id": 20,
            "name": " Hero",
            "description": "A legendary hero known for great strength.",
            "modified": "2024-04-30T15:00:00Z",
            "thumbnail": {
              "path": "http://example.com/thumbnails/mighty-hero",
              "extension": "png"
            },
            "comics": {
              "available": 15,
              "items": [
                {
                  "title": "Mighty Hero #1"
                },
                {
                  "title": "Mighty Hero #2"
                }
              ]
            },
            "series": {
              "available": 2,
              "items": [
                {
                  "name": "Mighty Series"
                }
              ]
            },
            "stories": {
              "available": 8,
              "items": [
                {
                  "name": "Origin Story",
                  "type": "origin"
                }
              ]
            },
            "events": {
              "available": 1,
              "items": [
                {
                  "name": "Final Battle"
                }
              ]
            },
            "urls": [
              {
                "type": "official",
                "url": "http://example.com/mighty-hero"
              },
              {
                "type": "profile",
                "url": "http://example.com/mighty-hero/profile"
              }
            ]
          }
          )
        
        expect(res.statusCode).toEqual(HttpStatus.CREATED);
        expect(Object.keys(res.body).length).toBeGreaterThan(0)
        expect(res.body).toEqual({"message": "Create characters Successfully"})
    })

    it(`Post character (failed)`,async () => {
        const res = await request(app).post('/characters')
        .send({
            "description": "A legendary hero known for great strength.",
            "modified": "2024-04-30T15:00:00Z",
            "thumbnail": {
              "path": "http://example.com/thumbnails/mighty-hero",
              "extension": "png"
            },
            "comics": {
              "available": 15,
              "items": [
                {
                  "title": "Mighty Hero #1"
                },
                {
                  "title": "Mighty Hero #2"
                }
              ]
            },
            "series": {
              "available": 2,
              "items": [
                {
                  "name": "Mighty Series"
                }
              ]
            },
            "stories": {
              "available": 8,
              "items": [
                {
                  "name": "Origin Story",
                  "type": "origin"
                }
              ]
            },
            "events": {
              "available": 1,
              "items": [
                {
                  "name": "Final Battle"
                }
              ]
            },
            "urls": [
              {
                "type": "official",
                "url": "http://example.com/mighty-hero"
              },
              {
                "type": "profile",
                "url": "http://example.com/mighty-hero/profile"
              }
            ]
          }
          )
        
        expect(res.statusCode).toEqual(HttpStatus.BAD_REQUEST);
        expect(res.body).toEqual({"message": "Unable to create element, missing fields: Name"})
    })

    it("Patch character (success)", async () => {
      const res = await request(app).patch('/characters/20')
      .send({
        "name": "Heroi editado",
        "description": "Este heroi foi editado",
        "modified": "2024-04-30T15:00:00Z",
        "thumbnail": {
          "path": "http://example.com/thumbnails/mighty-hero",
          "extension": "png"
        },
        "comics": {
          "available": 15,
          "items": [
            {
              "title": "Mighty Hero #1"
            },
            {
              "title": "Mighty Hero #2"
            }
          ]
        },
        "series": {
          "available": 2,
          "items": [
            {
              "name": "Mighty Series"
            }
          ]
        },
        "stories": {
          "available": 8,
          "items": [
            {
              "name": "Origin Story",
              "type": "origin"
            }
          ]
        },
        "events": {
          "available": 1,
          "items": [
            {
              "name": "Final Battle"
            }
          ]
        },
        "urls": [
          {
            "type": "official",
            "url": "http://example.com/mighty-hero"
          },
          {
            "type": "profile",
            "url": "http://example.com/mighty-hero/profile"
          }
        ]
      })
      expect(res.statusCode).toEqual(HttpStatus.OK);
    })
    

    it("Patch character (failed)", async () => {
      const res = await request(app).patch('/characters/20')
      .send({
        "name": "Heroi editado",
        "description": "Este heroi foi editado",
        "modified": "2024-04-30T15:00:00Z",
        "thumbnail": {
          "path": "http://example.com/thumbnails/mighty-hero",
          "extension": "png"
        },
        "comics": {
          "available": "asdf",
          "items": [
            {
              "title": 213
            },
            {
              "title": "Mighty Hero #2"
            }
          ]
        },
        "series": {
          "available": 2,
          "items": [
            {
              "name": "Mighty Series"
            }
          ]
        },
        "stories": {
          "available": 8,
          "items": [
            {
              "name": "Origin Story",
              "type": "origin"
            }
          ]
        },
        "events": {
          "available": "",
          "items": [
            {
              "name": 213
            }
          ]
        },
        "urls": [
          {
            "type": "official",
            "url": "http://example.com/mighty-hero"
          },
          {
            "type": "profile",
            "url": "http://example.com/mighty-hero/profile"
          }
        ]
      })
      expect(res.statusCode).toEqual(HttpStatus.BAD_REQUEST);
    })

    it('Delete by id (Success)', async () => {
      const res = await request(app).delete('/characters/20')
      expect(res.statusCode).toEqual(HttpStatus.OK);
    })

})