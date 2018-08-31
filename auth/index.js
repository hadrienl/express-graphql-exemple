module.exports = (req, res, next) => {
  const { query: { token } = {} } = req;

  // Please use a real auth token soon 😅
  if (token !== '1234') {
    return res.sendStatus(401);
  }

  // Simulate binding a authed user related to the token
  req.user = {
    id: '42',
    firstName: 'John',
    lastName: 'Abitbol',
  };

  return next();
}
