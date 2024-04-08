// eslint-disable-next-line no-unused-vars
export default (err, req, res, next) => {
  // 0 - Simple message
  // 1 - Entire error and status
  const debugLevel = 1;
  let message = {};

  switch (debugLevel) {
    case 0:
      console.log(err.name);
      if (err.name === 'AuthError') {
        message = { message: 'Unauthorized' };
      } else if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
        message = { message: 'Invalid token' };
      } else if (err.name.startsWith('PrismaClient')) {
        message = { message: 'Database error' };
      } else if (err.name === 'ZodValidationError') {
        message = { message: err };
      } else {
        message = { message: 'Je suis pas gérée' };
      }
      break;
    case 1:
      message = { message: err.message.replace(/\n/g, ''), error: err };
      console.log(err);
      break;
    default:
      console.log('bad debugLevel');
  }

  return res.status(err.status || 500).json(message);
};
