import '@babel/polyfill';
import 'cross-fetch/polyfill';

import seedDatabase, {
  userOne,
  commentOne,
  userTwo
} from './utils/seedDatabase';
import getClient from './utils/getClient';
import prisma from '../src/prisma';
import { deleteComment } from './utils/operations';

beforeEach(seedDatabase);

test('delete comment successfully', async () => {
  const client = getClient(userOne.jwt);

  const variables = { id: commentOne.comment.id };

  const { data } = await client.mutate({ mutation: deleteComment, variables });
  const existsInDb = await prisma.exists.Comment({ id: commentOne.comment.id });

  expect(data.deleteComment.id).toBe(commentOne.comment.id);
  expect(existsInDb).toBeFalsy();
});

test('fail to delete comment if not author', async () => {
  const client = getClient(userTwo.jwt);

  const variables = { id: commentOne.comment.id };
  await expect(
    client.mutate({ mutation: deleteComment, variables })
  ).rejects.toThrow();

  const existsInDb = await prisma.exists.Comment({ id: commentOne.comment.id });
  expect(existsInDb).toBeTruthy();
});
