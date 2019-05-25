import jwt from 'jsonwebtoken';

export default userId => jwt.sign({ userId }, process.env.JWT_SECRET);
