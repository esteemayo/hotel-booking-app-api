const createSendToken = (user, status, req, res) => {
  const { password, role, ...rest } = user._doc;

  res.status(status).json({
    status: 'success',
    ...rest,
  });
};

export default createSendToken;
