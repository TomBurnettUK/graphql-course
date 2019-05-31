import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../src/prisma';

export const userOne = {
  input: {
    name: 'Jen',
    email: 'jen@test.com',
    password: bcrypt.hashSync('pass123')
  },
  user: undefined, // Set during user creation process
  jwt: undefined // Set during user creation process
};

export const userTwo = {
  input: {
    name: 'Dave',
    email: 'dave@test.com',
    password: bcrypt.hashSync('pass456')
  },
  user: undefined, // Set during user creation process
  jwt: undefined // Set during user creation process
};

export const postOne = {
  input: {
    title: 'First test post',
    body: 'First post body',
    published: true
  },
  post: undefined // Set during post creation process
};

export const postTwo = {
  input: {
    title: 'Second unpublished test post',
    body: 'Second post body',
    published: false
  },
  post: undefined // Set during post creation process
};

export const commentOne = {
  input: {
    text: 'First comment'
  },
  comment: undefined // Set during comment creation process
};

export const commentTwo = {
  input: {
    text: 'Second comment'
  },
  comment: undefined // Set during comment creation process
};

export default async () => {
  await prisma.mutation.deleteManyUsers();

  // Users
  userOne.user = await prisma.mutation.createUser({
    data: userOne.input
  });
  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET);

  userTwo.user = await prisma.mutation.createUser({
    data: userTwo.input
  });
  userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET);

  // Posts
  postOne.post = await prisma.mutation.createPost({
    data: {
      ...postOne.input,
      author: { connect: { id: userOne.user.id } }
    }
  });

  postTwo.post = await prisma.mutation.createPost({
    data: {
      ...postTwo.input,
      author: { connect: { id: userTwo.user.id } }
    }
  });

  // Comments
  commentOne.comment = await prisma.mutation.createComment({
    data: {
      ...commentOne.input,
      post: { connect: { id: postOne.post.id } },
      author: { connect: { id: userOne.user.id } }
    }
  });

  commentTwo.comment = await prisma.mutation.createComment({
    data: {
      ...commentTwo.input,
      post: { connect: { id: postOne.post.id } },
      author: { connect: { id: userTwo.user.id } }
    }
  });
};
