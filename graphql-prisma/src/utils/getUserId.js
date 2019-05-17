import jwt from 'jsonwebtoken';

export default request => {
  const header = request.headers.authorization;

  if (!header) throw new Error('No authorization header');

  const token = header.replace('Bearer ', '');
  const decoded = jwt.verify(token, 'thisisasecret');

  return decoded.userId;
};
