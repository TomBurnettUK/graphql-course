import { GraphQLServer } from 'graphql-yoga';
import { Prisma } from 'prisma-binding';

import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import User from './resolvers/User';
import Post from './resolvers/Post';
import Comment from './resolvers/Comment';

const prisma = new Prisma({
  typeDefs: './src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
  secret: 'itsasecrettoeverybody'
});

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: { Query, Mutation, Subscription, User, Post, Comment },
  context({ request }) {
    return { prisma, request };
  }
});

server.start(() => {
  console.log('Server started!');
});
