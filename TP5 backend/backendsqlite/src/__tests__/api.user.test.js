const app = require('../app')
const request = require('supertest')


/*TEST GET USER */
describe('GET /users', () => {
  test('Test if get users works with initialized table user', async () => {
    const response = await request(app)
      .get('/users')
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('Returning users')
    expect(response.body.data.length).toBe(2)
  })
})

/*TEST DELETE USER */
describe('DELETE /users', () => {
  test('Test if we can delete users', async () => {
    const response = await request(app)
      .delete('/users')
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe("All users deleted")
  })
})

/*TEST POST USER */
describe('POST /users', () => {
  test('Test if post users works', async() => {
    const body = { 
      data : JSON.stringify({username: 'userA'})
    }

    const response = await request(app)
      .post('/users')
      .send(body)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('User Added')
  })
})




