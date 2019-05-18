import getUserId from '../utils/getUserId';

const Query = {
  me(_parent, _args, { prisma, request }, info) {
    const userId = getUserId(request);
    return prisma.query.user({ where: { id: userId } }, info);
  },

  users(_, { query }, { prisma }, info) {
    const args = {};

    if (query) {
      args.where = {
        name_contains: query
      };
    }

    return prisma.query.users(args, info);
  },

  async post(_, { id }, { prisma, request }, info) {
    const userId = getUserId(request, false);
    const [post] = await prisma.query.posts(
      {
        where: { id, OR: [{ published: true }, { author: { id: userId } }] }
      },
      info
    );

    if (!post) throw new Error('Post not found');

    return post;
  },

  posts(_, { query }, { prisma, request }, info) {
    const userId = getUserId(request, false);
    const args = { where: {} };

    if (userId) {
      args.where.author = { id: userId };
    } else {
      args.where.published = true;
    }

    if (query) {
      args.where.OR = [{ title_contains: query }, { body_contains: query }];
    }

    return prisma.query.posts(args, info);
  },

  comments(_parent, _args, { prisma }, info) {
    return prisma.query.comments(null, info);
  }
};

export default Query;
