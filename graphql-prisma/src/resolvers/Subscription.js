const Subscription = {
  post: {
    subscribe(_parent, _args, { prisma }, info) {
      return prisma.subscription.post(
        { where: { node: { published: true } } },
        info
      );
    }
  },

  comment: {
    subscribe(_, { postId }, { prisma }, info) {
      return prisma.subscription.comment(
        { where: { node: { post: { id: postId } } } },
        info
      );
    }
  }
};

export default Subscription;
