import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public-api/');

import { expect } from 'chai';

const TOKEN = process.env.USER_TOKEN;

describe.only('Users', () => {
  it('GET /users', () => {
    // request.get(`users?access-token=${TOKEN}`).end((err, res) => {
    //   expect(res.body.data).to.not.be.empty;
    //   done();
    // });

    return request.get(`users?access-token=${TOKEN}`).then((res) => {
      expect(res.body.data).to.not.be.empty;
    });
  });

  it('GET /users/:id', () => {
    return request.get(`users/1005?access-token=${TOKEN}`).then((res) => {
      expect(res.body.data.id).to.be.equal(1005);
    });
  });

  it('GET /users with query params', () => {
    const url = `users?access-token=${TOKEN}&page=5&gender=Female&status=Active`;

    return request.get(url).then((res) => {
      expect(res.body.data).to.be.empty;
      // expect(res.body.data).to.not.be.empty;
      // res.body.data.forEach((data) => {
      //   expect(data.gender).to.eq('Female');
      //   expect(data.status).to.eq('Active');
      // });
    });
  });

  it('POST /users', () => {
    const data = {
      email: `test-${Math.floor(Math.random() * 100)}@mail.ca`,
      name: `Test name-${Math.floor(Math.random() * 100)}`,
      gender: 'male',
      status: 'inactive',
    };

    return request
      .post('users')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send(data)
      .then((res) => {
        // console.log(res.body);
        expect(res.body.data).to.deep.includes(data);
      });
  });

  it('PUT /users/:id', () => {
    const data = {
      status: 'active',
      name: `Min-Rabbit-${Math.floor(Math.random() * 100)}`,
    };

    return request
      .put('users/1504')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send(data)
      .then((res) => {
        console.log(res.body);
        expect(res.body.data).to.deep.include(data);
      });
  });

  // it('DELETE /users/:id', () => {
  //   return request
  //     .delete('users/111')
  //     .set('Authorization', `Bearer ${TOKEN}`)
  //     .then((res) => {
  //       console.log(`Delete successfully`);
  //       // expect(res.body.data?.message).to.be.equals('Resource not found');
  //       expect(res.body.data).to.be.eq(null);
  //     });
  // });
});
