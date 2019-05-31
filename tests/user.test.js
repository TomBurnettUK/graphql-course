import '@babel/polyfill';
import 'cross-fetch/polyfill';

import prisma from '../src/prisma';
import seedDatabase, { userOne } from './utils/seedDatabase';
import getClient from './utils/getClient';

import { createUser, getUsers, login, getProfile } from './utils/operations';

const client = getClient();

beforeEach(seedDatabase);

test('create new user', async () => {
  const variables = {
    data: {
      name: 'Steve',
      email: 'steve@test.com',
      password: 'pass123'
    }
  };

  const response = await client.mutate({ mutation: createUser, variables });

  const userExists = await prisma.exists.User({
    id: response.data.createUser.user.id
  });

  expect(userExists).toBeTruthy();
});

test('get public author profiles', async () => {
  const response = await client.query({ query: getUsers });

  expect(response.data.users.length).toBe(2);
  expect(response.data.users[0].email).toBeNull();
});

test('reject login with bad credentials', async () => {
  const variables = { data: { email: 'jen@test.com', password: 'wrongpass' } };

  await expect(client.mutate({ mutation: login, variables })).rejects.toThrow();
});

test('reject signup with short password', async () => {
  const variables = {
    data: { name: 'Steve', email: 'steve@test.com', password: 'pass' }
  };

  await expect(
    client.mutate({ mutation: createUser, variables })
  ).rejects.toThrow();
});

test('fetch user profile', async () => {
  const client = getClient(userOne.jwt);

  const { data } = await client.query({ query: getProfile });

  expect(data.me.id).toBe(userOne.user.id);
  expect(data.me.name).toBe(userOne.user.name);
  expect(data.me.email).toBe(userOne.user.email);
});
