const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const User = require("../models/User");

module.exports = {
  // register: async (req, res) => {
  //   const errors = validationResult(req);

  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  //   }

  //   const { name, email, password, birthday } = req.body;

  //   try {
  //     let user = await User.findOne({ email });

  //     if (user) {
  //       return res
  //         .status(400)
  //         .json({ errors: [{ msg: "User already exists!" }] });
  //     }

  //     user = new User({
  //       name,
  //       email,
  //       password,
  //       birthday,
  //     });

  //     const salt = await bcrypt.genSalt(10);
  //     user.password = await bcrypt.hash(password, salt);

  //     await user.save();

  //     const payload = {
  //       user: {
  //         id: user.id,
  //       },
  //     };

  //     jwt.sign(
  //       payload,
  //       process.env.JWT_SECRET,
  //       { expiresIn: "8h" },
  //       (err, token) => {
  //         if (err) throw err;
  //         res.json({ token });
  //       }
  //     );
  //   } catch (err) {
  //     console.log(err.message);
  //     res.status(500).send("Server error!");
  //   }
  // },
  register: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, fullName, birthday } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists!" }] });
      }

      user = new User({
        email,
        password,
        fullName,
        birthday,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "8h" },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error!");
    }
  },
};
