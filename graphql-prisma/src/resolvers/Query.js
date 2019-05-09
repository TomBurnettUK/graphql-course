const Query = {
  posts(_, { query }, { db }) {
    if (!query) return db.posts;

    return db.posts.filter(post =>
      (post.title + post.body).toLowerCase().includes(query.toLowerCase())
    );
  },

  users(_, { query }, { db }) {
    if (!query) return db.users;

    return db.users.filter(user =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );
  },

  comments(_parent, _args, { db }) {
    return db.comments;
  },

  me() {
    return {
      id: 'fa3d7fc3-6357-490c-bd6f-041f34c9457d',
      name: 'Joshua Parisian',
      email: 'Loyal_Miller@example.org',
      age: 35
    };
  },

  post() {
    return {
      id: 'cde456',
      title: 'Post Title',
      body: 'Post body...',
      published: true
    };
  }
};

export default Query;
