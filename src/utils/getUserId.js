import jwt from 'jsonwebtoken';

export default (request, throwOnMissingAuthHeader = true) => {
  const header = request.request
    ? request.request.headers.authorization
    : request.connection.context.Authorization;

  if (header) {
    const token = header.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return decoded.userId;
  }

  if (throwOnMissingAuthHeader) throw new Error('No authorization header');

  return null;
};
