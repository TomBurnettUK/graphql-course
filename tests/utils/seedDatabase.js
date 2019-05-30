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

export const postOne = {
  input: {
    title: 'First test post',
    body: 'First post body',
    published: true
  },
  post: undefined // Set during post creation process
};

export default async () => {
  await prisma.mutation.deleteManyPosts();
  await prisma.mutation.deleteManyUsers();

  userOne.user = await prisma.mutation.createUser({
    data: userOne.input
  });
  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET);

  postOne.post = await prisma.mutation.createPost({
    data: {
      ...postOne.input,
      author: { connect: { id: userOne.user.id } }
    }
  });

  await prisma.mutation.createPost({
    data: {
      title: 'Second unpublished test post',
      body: 'Second post body',
      published: false,
      author: { connect: { id: userOne.user.id } }
    }
  });
};
