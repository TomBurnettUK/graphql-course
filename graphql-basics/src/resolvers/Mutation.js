import uuidv4 from 'uuid/v4';

const Mutation = {
  createUser(_, { data }, { db }) {
    const { name, email, age } = data;

    const emailTaken = db.users.some(
      user => email && user.email.toLowerCase() === email.toLowerCase()
    );
    if (emailTaken) throw new Error('Email already in use');

    const user = { id: uuidv4(), name, email, age };
    db.users.push(user);
    return user;
  },

  deleteUser(_, { id }, { db }) {
    const userIndex = db.users.findIndex(user => user.id === id);

    if (userIndex === -1) throw new Error('User not found');

    const deletedUser = db.users.splice(userIndex, 1)[0];

    db.posts = db.posts.filter(post => {
      if (post.author === id) {
        db.comments = db.comments.filter(comment => comment.post !== post.id);
        return false;
      }
      return true;
    });

    db.comments = db.comments.filter(comment => comment.author !== id);

    return deletedUser;
  },

  updateUser(_, { id, data }, { db }) {
    const { name, email, age } = data;
    const user = db.users.find(user => user.id === id);

    if (!user) throw new Error('User not found');

    if (typeof email === 'string') {
      const emailTaken = db.users.some(
        user => email && user.email.toLowerCase() === email.toLowerCase()
      );

      if (emailTaken) throw new Error('Email already in use');

      user.email = email;
    }

    if (typeof name === 'string') user.name = name;

    if (typeof age !== 'undefined') user.age = age;

    return user;
  },

  createPost(_, { data }, { db, pubsub }) {
    const { title, body, published, author } = data;

    const userExists = db.users.some(user => user.id === author);
    if (!userExists) throw new Error('Author not found');

    const post = { id: uuidv4(), title, body, published, author };
    db.posts.push(post);

    if (published) pubsub.publish('POST', { post });

    return post;
  },

  deletePost(_, { id }, { db }) {
    const postIndex = db.posts.findIndex(post => post.id === id);

    if (postIndex === -1) throw new Error('Post not found');

    const deletedPost = db.posts.splice(postIndex, 1)[0];

    db.comments = db.comments.filter(comment => comment.post !== id);

    return deletedPost;
  },

  updatePost(_, { id, data }, { db }) {
    const { title, body, published } = data;

    const post = db.posts.find(post => post.id === id);

    if (!post) throw new Error('Post not found');

    if (typeof title === 'string') post.title = title;

    if (typeof body === 'string') post.body = body;

    if (typeof published === 'boolean') post.published = published;

    return post;
  },

  createComment(_, { data }, { db, pubsub }) {
    const { text, post, author } = data;

    const postExists = db.posts.some(
      dbPost => dbPost.id === post && dbPost.published
    );
    if (!postExists) throw new Error('Post not found');

    const authorExists = db.users.some(user => user.id === author);
    if (!authorExists) throw new Error('Author not found');

    const comment = { id: uuidv4(), text, post, author };
    db.comments.push(comment);
    pubsub.publish(`COMMENT ${post}`, { comment });
    return comment;
  },

  deleteComment(_, { id }, { db }) {
    const commentIndex = db.comments.indexOf(comment => comment.id === id);

    if (commentIndex === -1) throw new Error('Comment not found');

    return db.comments.splice(commentIndex, 1)[0];
  },

  updateComment(_, { id, data }, { db }) {
    const { text } = data;

    const comment = db.comments.find(comment => comment.id === id);

    if (!comment) throw new Error('Comment not found');

    if (typeof text === 'string') comment.text = text;

    return comment;
  }
};

export default Mutation;
