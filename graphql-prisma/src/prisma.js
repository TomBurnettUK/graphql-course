import { prisma } from '../prisma/prisma-client';

const createPostForUser = async (authorId, data) => {
  const userExists = await prisma.$exists.user({ id: authorId });
  if (!userExists) throw new Error('User not found');

  const author = await prisma
    .createPost({ ...data, author: { connect: { id: authorId } } })
    .author();

  return author;
};

// createPostForUser('cjvcb4kw500310728vxly53ei', {
//   title: 'A decent post title',
//   body: 'Some decent copy',
//   published: true
// });

const updatePostForUser = async (postId, data) => {
  const postExists = await prisma.$exists.post({ id: postId });
  if (!postExists) throw new Error('Post not found');

  const author = await prisma
    .updatePost({ data, where: { id: postId } })
    .author();

  return author;
};

// updatePostForUser('cjvf4vexz00710728tlg2wzcd', {
//   title: 'Not so awesome title'
// });
