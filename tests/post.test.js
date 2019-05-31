import '@babel/polyfill';
import 'cross-fetch/polyfill';

import seedDatabase, {
  userOne,
  userTwo,
  postOne,
  postTwo
} from './utils/seedDatabase';
import getClient from './utils/getClient';
import prisma from '../src/prisma';
import {
  getPosts,
  createPost,
  updatePost,
  deletePost
} from './utils/operations';

const client = getClient();

beforeEach(seedDatabase);

test('get public posts', async () => {
  const { data } = await client.query({ query: getPosts });

  expect(data.posts.length).toBe(1);
  expect(data.posts[0].published).toBeTruthy();
});

test('get user posts', async () => {
  const client = getClient(userOne.jwt);

  const { data } = await client.query({ query: getPosts });

  expect(data.posts.length).toBe(1);
});

test('create post', async () => {
  const client = getClient(userOne.jwt);

  const variables = {
    data: {
      title: 'Third test post',
      body: 'Third post body',
      published: true
    }
  };

  const { data } = await client.mutate({ mutation: createPost, variables });
  const existsInDb = await prisma.exists.Post({ title: 'Third test post' });

  expect(data.createPost.title).toBe('Third test post');
  expect(existsInDb).toBeTruthy();
});

test('update post', async () => {
  const client = getClient(userOne.jwt);

  const variables = { id: postOne.post.id, data: { published: false } };

  const { data } = await client.mutate({ mutation: updatePost, variables });
  const existsInDb = await prisma.exists.Post({
    id: postOne.post.id,
    published: false
  });

  expect(data.updatePost.published).toBeFalsy();
  expect(existsInDb).toBeTruthy();
});

test('delete post', async () => {
  const client = getClient(userTwo.jwt);

  const variables = { id: postTwo.post.id };

  const { data } = await client.mutate({ mutation: deletePost, variables });
  const existsInDb = await prisma.exists.Post({ id: postTwo.post.id });

  expect(data.deletePost.title).toBe(postTwo.post.title);
  expect(existsInDb).toBeFalsy();
});
