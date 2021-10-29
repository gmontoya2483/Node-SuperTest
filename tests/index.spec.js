import app from '../src/app'
import request from 'supertest'

describe('GET /tasks', ()=>{

    test('Should respond with a 200 status code', async () => {
       const response = await request(app).get('/tasks').send();
       expect(response.statusCode).toBe(200);
   });

   test('Should respond with an array', async () => {
       const response = await request(app).get('/tasks').send();
       expect(response.body).toBeInstanceOf(Array);
   });
});

describe('POST /tasks', () => {

    describe("Given a title and a description - Positive Tests", () => {

        const newTask = {
            title: "Test Task",
            description: "Test description"
        }


        // Should respond with a 201 status code
        test('Should respond with a 201 status code', async () => {
            const response = await request(app).post('/tasks').send(newTask);
            expect(response.statusCode).toBe(201);

        });

        // Should respond with a content-type of application/json
        test('Should respond with a content-type of application/json in the header', async () => {
            const response = await request(app).post('/tasks').send(newTask);
            expect(response.header['content-type']).toEqual(expect.stringContaining('json'));
        })

        // Should respond with a json object containing the new task with an id
        test('Should respond with a json object containing the new task with an id', async() => {
            const response = await request(app).post('/tasks').send(newTask);
            expect(response.body.id).toBeDefined();
        })

    });


    describe("Incomplete request - Negative test - Manual not the best way!!!!", () => {



        test('should respond with a 400 status code if both title and description are missed', async () => {
            const response = await request(app).post('/tasks').send({});
            expect(response.statusCode).toBe(400);
        });

        test('should respond with a 400 status code if description is missed', async () => {
            const response = await request(app).post('/tasks').send({title:'test title'});
            expect(response.statusCode).toBe(400);
        });

        test('should respond with a 400 status code if title is missed', async () => {
            const response = await request(app).post('/tasks').send({description:'test description'});
            expect(response.statusCode).toBe(400);
        });

    });


    describe("Incomplete request - Negative test - Loop Correct way !!!!", () => {

        test('should respond with a 400 status code if either title or description is missed', async () => {
            const bodyRequests = [
                {},
                {description:'test description'},
                {title:'test title'}
            ]

            for (const body of bodyRequests) {
                const response = await request(app).post('/tasks').send(body);
                expect(response.statusCode).toBe(400);
                expect(response.body.message).toBeDefined();

            }

        });

    });






});
