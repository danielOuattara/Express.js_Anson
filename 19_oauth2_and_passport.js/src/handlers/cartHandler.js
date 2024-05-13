import User from "../mongoose/schema/user.schema.js";

export const addToCart = async (req, res) => {
  if (!req.user || req.user._id.toString() !== req.session.passport.user) {
    return res.sendStatus(401);
  }
  //---> add to `cart` in session
  if (req.session.cart) {
    req.session.cart.push(req.body);
  } else {
    req.session.cart = [req.body];
  }

  //---> add to cart in user.cart in DB
  try {
    const user = await User.findById(req.user._id);
    user.cart.push(req.body);
    await user.save();
    return res.status(201).send(req.body);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

//----------

export const getCart = async (req, res) => {
  if (req.user && req.user._id.toString() !== req.session.passport.user) {
    return res.sendStatus(401);
  }

  const user = await User.findById(req.session.passport.user);

  return res.status(200).send({
    "req.session.cart = ": req.session.cart ?? [],
    "user.cart = ": user.cart,
  });
};
