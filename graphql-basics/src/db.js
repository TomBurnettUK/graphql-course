const users = [
  {
    id: '98457740-9431-4dc6-9408-b55085644025',
    name: 'Mercedes Effertz',
    email: 'Khalil.Cummerata@yahoo.com',
    age: 34
  },
  {
    id: '9a085732-ec94-406e-bcd0-b58d30d26b6d',
    name: 'Jany Koepp',
    email: 'Elyse.Ziemann@yahoo.com',
    age: 23
  },
  {
    id: '0c7a381b-38b4-4dd8-8e31-94b096a745873',
    name: `Darrick O'Keefe`,
    email: 'Enoch22@hotmail.com',
    age: 19
  }
];

const posts = [
  {
    id: 'c6be25bf-a862-4d8e-b488-6e79abb5ccad',
    author: '98457740-9431-4dc6-9408-b55085644025',
    title: 'Corporis sint eligendi odit.',
    body: 'Est consequuntur ratione enim.',
    published: true
  },
  {
    id: 'ab2a1f3e-5e91-4c24-8865-7aa27b856a8a',
    author: '98457740-9431-4dc6-9408-b55085644025',
    title: 'Dignissimos dolores perferendis et rerum.',
    body: 'Autem eius nesciunt in beatae repellat et voluptatem eveniet.',
    published: true
  },
  {
    id: 'e7f14a74-4645-467f-b8c7-05db0728e150',
    author: '0c7a381b-38b4-4dd8-8e31-94b096a745873',
    title: 'Eaque qui quam dignissimos enim similique aliquam et neque.',
    body: 'Eligendi nobis sunt laudantium.',
    published: false
  }
];

const comments = [
  {
    id: '9168de7d-b9db-45b0-991c-b07ae700ca46',
    post: 'c6be25bf-a862-4d8e-b488-6e79abb5ccad',
    author: '98457740-9431-4dc6-9408-b55085644025',
    text: 'Corrupti nulla omnis accusantium est libero harum et qui reiciendis.'
  },
  {
    id: '6844cf4e-409c-4c39-8cd2-3f728ceeeaa3',
    post: 'c6be25bf-a862-4d8e-b488-6e79abb5ccad',
    author: '9a085732-ec94-406e-bcd0-b58d30d26b6d',
    text: 'Consequatur qui quae nobis a officiis nihil odio.'
  },
  {
    id: 'feeae45f-0e86-4b79-b423-952230557896',
    post: 'e7f14a74-4645-467f-b8c7-05db0728e150',
    author: '9a085732-ec94-406e-bcd0-b58d30d26b6d',
    text: 'Omnis quisquam et reprehenderit ad.'
  },
  {
    id: '63b359a3-8f27-4209-94c8-f0894087314f',
    post: 'ab2a1f3e-5e91-4c24-8865-7aa27b856a8a',
    author: '0c7a381b-38b4-4dd8-8e31-94b096a745873',
    text: 'Laborum maiores qui est sunt aperiam.'
  }
];

const db = { users, posts, comments };

export default db;
