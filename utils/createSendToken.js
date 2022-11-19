const createSendToken = (user, status, req, res) => {
  const token = user.generateAuthToken();
  const { password, role, ...rest } = user._doc;

  res.status(status).json({
    status: 'success',
    token,
    ...rest,
  });
};

export default createSendToken;
