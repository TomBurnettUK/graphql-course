import ApolloClient from 'apollo-boost/lib/index';

export default jwt => {
  return new ApolloClient({
    uri: 'http://localhost:4000',
    request({ setContext }) {
      if (jwt) {
        setContext({ headers: { Authorization: `Bearer ${jwt}` } });
      }
    }
  });
};
