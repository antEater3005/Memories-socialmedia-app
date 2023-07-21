import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.js';

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Invalid credentials.' });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );
    res.status(200).json({ userData: existingUser, token: token });
  } catch (error) {
    res.status(500).json({ message: "Something wen't wrong." });
  }
};

export const signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser)
      return res
        .status(409)
        .json({ message: 'User already Exist, login instead.' });
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await UserModel.create({
      name: `${firstName} ${lastName}`,
      email: email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.SECRET_KEY,
      {
        expiresIn: '1h',
      }
    );
    res.status(200).json({ userData: newUser, token: token });
  } catch (error) {
    res.status(500).json({ message: "Something wen't wrong." });
  }
};
