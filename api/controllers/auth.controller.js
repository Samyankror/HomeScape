import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const { username, email, password, photo } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    avatar: photo,
  });

  try {
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};
const generateAccessAndRefreshToken = (id) => {
  const accessToken = jwt.sign({ id }, process.env.JWT_SECRET_ACCESS, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ id }, process.env.JWT_SECRET_REFRESH, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, "user not found"));
    }

    const isPasswordCorrect = bcryptjs.compareSync(
      password,
      validUser.password
    );
    if (!isPasswordCorrect) {
      return next(errorHandler(401, "invalid password"));
    }
<<<<<<< HEAD
    const { accessToken, refreshToken } = generateAccessAndRefreshToken(
      validUser._id
    );
    validUser.refreshToken = refreshToken;
    await validUser.save();
    const { password: pass, refreshToken: refToken, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ success: true, user: rest });
=======
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res.cookie("accessToken", token, { httpOnly: true,maxAge: 7 * 24 * 60 * 60 * 1000}).status(200).json({
      success: true,
      user: rest,
    });
>>>>>>> 93eced9b060c6f880028878e5a6dc634544c3a09
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const { accessToken, refreshToken } = generateAccessAndRefreshToken(
        user._id
      );
      user.refreshToken = refreshToken;
      await user.save();
      const { password: pass, refreshToken: refToken, ...rest } = user._doc;
      return res
        .status(200)
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          maxAge: 15 * 60 * 1000,
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json({
          success: true,
          user: rest,
        });
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });

      const { accessToken, refreshToken } = generateAccessAndRefreshToken(
        newUser._id
      );

      newUser.refreshToken = refreshToken;
      await newUser.save();
      const { password: pass, refreshToken: refToken, ...rest } = newUser._doc;
      return res
<<<<<<< HEAD
=======
        .cookie("accessToken", token, { httpOnly: true,maxAge: 7 * 24 * 60 * 60 * 1000 })
>>>>>>> 93eced9b060c6f880028878e5a6dc634544c3a09
        .status(200)
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          maxAge: 15 * 60 * 1000,
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json({
          success: true,
          user: rest,
        });
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(
      req.body._id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      {
        new: true,
      }
    );

    return res
      .status(200)
      .clearCookie("accessToken", { httpOnly: true })
      .clearCookie("refreshToken", { httpOnly: true })
      .json({ success: true, message: "user has been logout" });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  const incomingRefreshToken = req.cookies.refreshToken;
  if (!incomingRefreshToken) {
    return next(errorHandler(401, "unauthorized request"));
  }
  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.JWT_SECRET_REFRESH
    );
    const user = await User.findById(decodedToken?.id);

    if (!user) {
      return next(errorHandler(401, "Invalid refresh token"));
    }

    if (incomingRefreshToken !== user.refreshToken) {
      return next(errorHandler(401, "refresh token is expired or used"));
    }
    const { accessToken, refreshToken } = generateAccessAndRefreshToken(
      user._id
    );
    user.refreshToken = refreshToken;
    await user.save();
    return res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: "Access token refreshed",
      });
  } catch (error) {
    next(error);
  }
};
