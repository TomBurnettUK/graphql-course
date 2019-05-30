import { Prisma, extractFragmentReplacements } from 'prisma-binding';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import User from './resolvers/User';
import Post from './resolvers/Post';
import Comment from './resolvers/Comment';

export const resolvers = { Query, Mutation, Subscription, User, Post, Comment };

export const fragmentReplacements = extractFragmentReplacements(resolvers);

export default new Prisma({
  typeDefs: './src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  fragmentReplacements
});
