require('dotenv').config();
const faker = require('faker');

import request from '../config/supertest';
import { expect } from 'chai';

const { createRandomUserWithFaker } = require('../helper/user');

const TOKEN = process.env.USER_TOKEN;

describe.only('ABOUT POSTS', () => {
  let user, postId;

  before(async () => {
    user = await createRandomUserWithFaker();
  });

  describe('test route POST', () => {
    it('method POST /posts', async () => {
      const data = {
        user_id: user.id,
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraphs(),
      };

      const res = await request
        .post('posts')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(data);

      expect(res.body.data).to.deep.include(data);
      postId = res.body.data.id;
    });

    it('method GET posts/:id', async () => {
      if (postId) {
        await request
          .get(`posts/${postId}`)
          .set('Authorization', `Bearer ${TOKEN}`)
          .expect(200);
      } else {
        throw new Error(`postId is invalid - ${postId}`);
      }
    });
  });

  describe('test validation', () => {

    it('return 401 if authentication failed', async () => {
      const data = {
        user_id: user.id,
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraphs(),
      };

      const res = await request.post(`posts`).send(data);

      expect(res.body.code).to.eq(401);
      expect(res.body.data.message).to.eq('Authentication failed');
    });
  });
});
