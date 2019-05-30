import { GraphQLServer } from 'graphql-yoga';

import prisma, { resolvers, fragmentReplacements } from './prisma';

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  fragmentReplacements,
  context(request) {
    return { prisma, request };
  }
});

export default server;
