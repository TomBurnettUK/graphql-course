const Subscription = {
  post: {
    subscribe(_parent, _args, { pubsub }) {
      return pubsub.asyncIterator(`POST`);
    }
  },

  comment: {
    subscribe(_, { postId }, { db, pubsub }) {
      const post = db.posts.find(post => post.id === postId && post.published);

      if (!post) throw new Error('Post not found');

      return pubsub.asyncIterator(`COMMENT ${postId}`);
    }
  }
};

export default Subscription;
