import '@babel/polyfill';
import 'cross-fetch/polyfill';
import { gql } from 'apollo-boost/lib/index';

import prisma from '../src/prisma';
import seedDatabase, { userOne } from './utils/seedDatabase';
import getClient from './utils/getClient';

const client = getClient();

beforeEach(seedDatabase);

test('create new user', async () => {
  const createUser = gql`
    mutation {
      createUser(
        data: { name: "Steve", email: "andrew@test.com", password: "pass123" }
      ) {
        token
        user {
          id
        }
      }
    }
  `;

  const response = await client.mutate({ mutation: createUser });

  const userExists = await prisma.exists.User({
    id: response.data.createUser.user.id
  });

  expect(userExists).toBeTruthy();
});

test('get public author profiles', async () => {
  const getUsers = gql`
    query {
      users {
        id
        name
        email
      }
    }
  `;

  const response = await client.query({ query: getUsers });

  expect(response.data.users.length).toBe(1);
  expect(response.data.users[0].email).toBeNull();
  expect(response.data.users[0].name).toBe('Jen');
});

test('reject login with bad credentials', async () => {
  const login = gql`
    mutation {
      loginUser(data: { email: "jen@test.com", password: "wrongpass" }) {
        token
      }
    }
  `;

  await expect(client.mutate({ mutation: login })).rejects.toThrow();
});

test('reject signup with short password', async () => {
  const createUser = gql`
    mutation {
      createUser(
        data: { name: "Steve", email: "andrew@test.com", password: "pass" }
      ) {
        token
        user {
          id
        }
      }
    }
  `;

  await expect(client.mutate({ mutation: createUser })).rejects.toThrow();
});

test('fetch user profile', async () => {
  const client = getClient(userOne.jwt);

  const getProfile = gql`
    query {
      me {
        id
        name
        email
      }
    }
  `;

  const { data } = await client.query({ query: getProfile });

  expect(data.me.id).toBe(userOne.user.id);
  expect(data.me.name).toBe(userOne.user.name);
  expect(data.me.email).toBe(userOne.user.email);
});
