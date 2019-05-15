const Query = {
  users(_, { query }, { prisma }, info) {
    const args = {};

    if (query) {
      args.where = {
        OR: [{ name_contains: query }, { email_contains: query }]
      };
    }

    return prisma.query.users(args, info);
  },

  posts(_, { query }, { prisma }, info) {
    const args = {};

    if (query) {
      args.where = {
        OR: [{ title_contains: query }, { body_contains: query }]
      };
    }

    return prisma.query.posts(args, info);
  },

  comments(_parent, _args, { prisma }, info) {
    return prisma.query.comments(null, info);
  }
};

export default Query;
