import getUserId from '../utils/getUserId';

const Subscription = {
  post: {
    subscribe(_parent, _args, { prisma }, info) {
      return prisma.subscription.post(
        { where: { node: { published: true } } },
        info
      );
    }
  },

  myPost: {
    subscribe(_parent, _args, { prisma, request }, info) {
      const userId = getUserId(request);
      return prisma.subscription.post(
        { where: { node: { author: { id: userId } } } },
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
