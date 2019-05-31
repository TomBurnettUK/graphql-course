import gql from 'graphql-tag';

// ***************************************
// User
// ***************************************

export const createUser = gql`
  mutation($data: CreateUserInput!) {
    createUser(data: $data) {
      token
      user {
        id
      }
    }
  }
`;

export const getUsers = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

export const login = gql`
  mutation($data: LoginUserInput!) {
    loginUser(data: $data) {
      token
    }
  }
`;

export const getProfile = gql`
  query {
    me {
      id
      name
      email
    }
  }
`;

// ***************************************
// Post
// ***************************************

export const getPosts = gql`
  query {
    posts {
      id
      title
      body
      published
    }
  }
`;

export const createPost = gql`
  mutation($data: CreatePostInput!) {
    createPost(data: $data) {
      id
      title
      body
      published
    }
  }
`;

export const updatePost = gql`
  mutation($id: ID!, $data: UpdatePostInput!) {
    updatePost(id: $id, data: $data) {
      id
      title
      body
      published
    }
  }
`;

export const deletePost = gql`
  mutation($id: ID!) {
    deletePost(id: $id) {
      id
      title
      body
    }
  }
`;
