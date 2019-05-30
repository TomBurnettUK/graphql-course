import '@babel/polyfill';
import 'cross-fetch/polyfill';
import { gql } from 'apollo-boost/lib/index';

// import prisma from '../src/prisma';
import seedDatabase, { userOne, postOne } from './utils/seedDatabase';
import getClient from './utils/getClient';

const client = getClient();

beforeEach(seedDatabase);

test('get public posts', async () => {
  const getPosts = gql`
    query {
      posts {
        id
        title
        body
        published
      }
    }
  `;

  const { data } = await client.query({ query: getPosts });

  expect(data.posts.length).toBe(1);
  expect(data.posts[0].published).toBeTruthy();
});

test('get user posts', async () => {
  const client = getClient(userOne.jwt);

  const getPosts = gql`
    query {
      posts {
        id
        title
        body
        published
      }
    }
  `;

  const { data } = await client.query({ query: getPosts });

  expect(data.posts.length).toBe(2);
});

// test('update own post', async () => {
//   const client = getClient(userOne.jwt);
//   const updatePost = gql`
//     mutation {
//       updatePost(
//         id: "${postOne.post.id}",
//         data: {
//           published: false
//         }
//       ){
//         id
//         title
//         body
//         published
//       }
//     }
//   `;

//   // const { data } = await client.mutate({
//   //   mutation: updatePost,
//   //   awaitRefetchQueries: true
//   // });
// });
