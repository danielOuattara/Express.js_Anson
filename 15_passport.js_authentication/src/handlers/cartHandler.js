export const addToCart = (req, res) => {
  if (!req.user || req.user.id !== req.session.passport.user) {
    return res.sendStatus(401);
  }
  if (req.session.cart) {
    req.session.cart.push(req.body);
  } else {
    req.session.cart = [req.body];
  }
  return res.status(201).send(req.body);
};

//----------

export const getCart = (req, res) => {
  if (req.user && req.user.id !== req.session.passport.user) {
    return res.sendStatus(401);
  }
  return res.status(200).send(req.session.cart ?? []);
};
