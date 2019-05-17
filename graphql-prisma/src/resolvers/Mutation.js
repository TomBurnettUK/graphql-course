import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import getUserId from '../utils/getUserId';

const Mutation = {
  async createUser(_, { data }, { prisma }) {
    if (data.password.length < 6)
      throw new Error('Password must be at least 6 characters');

    const password = await bcrypt.hash(data.password, 10);

    const user = await prisma.mutation.createUser({
      data: { ...data, password }
    });

    return {
      user,
      token: jwt.sign({ userId: user.id }, 'thisisasecret')
    };
  },

  async loginUser(_, { data }, { prisma }) {
    const user = await prisma.query.user({ where: { email: data.email } });
    if (!user) throw new Error('Email or password incorrect');

    const passwordMatch = await bcrypt.compare(data.password, user.password);
    if (!passwordMatch) throw new Error('Email or password incorrect');

    return {
      user,
      token: jwt.sign({ userId: user.id }, 'thisisasecret')
    };
  },

  deleteUser(_parent, _args, { prisma, request }, info) {
    const id = getUserId(request);

    return prisma.mutation.deleteUser({ where: { id } }, info);
  },

  updateUser(_, { data }, { prisma, request }, info) {
    const id = getUserId(request);

    return prisma.mutation.updateUser({ where: { id }, data }, info);
  },

  createPost(_, { data }, { prisma, request }, info) {
    const { title, body, published } = data;
    const userId = getUserId(request);

    return prisma.mutation.createPost(
      { data: { title, body, published, author: { connect: { id: userId } } } },
      info
    );
  },

  async deletePost(_, { id }, { prisma, request }, info) {
    const userId = getUserId(request);
    const postExists = await prisma.exists.Post({ id, author: { id: userId } });

    if (!postExists) throw new Error('Unable to delete post');

    return prisma.mutation.deletePost({ where: { id } }, info);
  },

  async updatePost(_, { id, data }, { prisma, request }, info) {
    const userId = getUserId(request);
    const postExists = await prisma.exists.Post({ id, author: { id: userId } });

    if (!postExists) throw new Error('Unable to update post');

    return prisma.mutation.updatePost({ where: { id }, data }, info);
  },

  createComment(_, { data }, { prisma, request }, info) {
    const { text, post } = data;
    const userId = getUserId(request);

    return prisma.mutation.createComment(
      {
        data: {
          text,
          post: { connect: { id: post } },
          author: { connect: { id: userId } }
        }
      },
      info
    );
  },

  async deleteComment(_, { id }, { prisma, request }, info) {
    const userId = getUserId(request);
    const commentExists = await prisma.exists.Comment({
      id,
      author: { id: userId }
    });

    if (!commentExists) throw new Error('Unable to delete comment');

    return prisma.mutation.deleteComment({ where: { id } }, info);
  },

  async updateComment(_, { id, data }, { prisma, request }, info) {
    const userId = getUserId(request);
    const commentExists = await prisma.exists.Comment({
      id,
      author: { id: userId }
    });

    if (!commentExists) throw new Error('Unable to update comment');

    return prisma.mutation.updateComment({ data, where: { id } }, info);
  }
};

export default Mutation;
