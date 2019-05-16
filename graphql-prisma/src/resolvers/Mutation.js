const Mutation = {
  async createUser(_, { data }, { prisma }, info) {
    return prisma.mutation.createUser({ data }, info);
  },

  async deleteUser(_, { id }, { prisma }, info) {
    return prisma.mutation.deleteUser({ where: { id } }, info);
  },

  updateUser(_, { id, data }, { prisma }, info) {
    return prisma.mutation.updateUser({ where: { id }, data }, info);
  },

  createPost(_, { data }, { prisma }, info) {
    const { title, body, published, author } = data;
    return prisma.mutation.createPost(
      { data: { title, body, published, author: { connect: { id: author } } } },
      info
    );
  },

  deletePost(_, { id }, { prisma }, info) {
    return prisma.mutation.deletePost({ where: { id } }, info);
  },

  updatePost(_, { id, data }, { prisma }, info) {
    return prisma.mutation.updatePost({ where: { id }, data }, info);
  },

  createComment(_, { data }, { prisma }, info) {
    const { text, post, author } = data;
    return prisma.mutation.createComment(
      {
        data: {
          text,
          post: { connect: { id: post } },
          author: { connect: { id: author } }
        }
      },
      info
    );
  },

  deleteComment(_, { id }, { prisma }, info) {
    return prisma.mutation.deleteComment({ where: { id } }, info);
  },

  updateComment(_, { id, data }, { prisma }, info) {
    return prisma.mutation.updateComment({ data, where: { id } }, info);
  }
};

export default Mutation;
