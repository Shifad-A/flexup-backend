const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// logic for register

exports.userRegister = async (req, res) => {
  const { username, password, email, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(401).json("User already exist");
    } else {
      const newUser = new User({ username, email, password, role });
      await newUser.save();
      res.status(200).json({ message: "User Added Successfully", newUser });
    }
  } catch (error) {
    res.status(500).json("error" + error);
  }
};

exports.userLogin = async (req, res) => {
  const { password, email } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (existingUser.password == password) {
        const token = jwt.sign(
          { email: existingUser.email, id: existingUser._id },
          process.env.jwtkey,
        );
        console.log(token);

        return res.status(200).json({ message: "Login Success", existingUser, token });
      } else {
        return res.status(401).json("Incorrect password");
      }
    } else {
      return res.status(401).json("User Not Exist");
    }
  } catch (err) {
    res.status(500).json("error" + err);
  }
};
exports.googleLogin = async (req, res) => {
  console.log("inside googleLogin");
  const { username, email, password, profile } = req.body;

  try {
    console.log('inside try cathch');
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      //genarate token
      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        process.env.jwtkey,
      );
      console.log(token);
      return res
        .status(200)
        .json({ message: "Login Success", existingUser, token });
    } else {
      const newUser = new User({ username, email, password, profile });
      await newUser.save();
      //genarate token
      const token = jwt.sign(
        { usermail: newUser.email, id: newUser._id },
        process.env.jwtkey,
      );
      console.log(token);
      return res
        .status(200)
        .json({ message: "User Added successfully", newUser, token });
    }
  } catch (error) {
    console.log("error", error);
  }
};
exports.getUser = async (req, res) => {
  const email = req.payload;
  console.log(email);

  try {
    const activeUser = await User.find({ email });
    res.status(200).json(activeUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateUser = async (req, res) => {
  const { username, password, bio, profile } = req.body;
  const email = req.payload;
  console.log(req.file);

  const uploadedProfile = req.file ? req.file.filename : profile;
  try {
    const updateUser = await User.findOneAndUpdate(
      { email },
      { username, email, password, profile: uploadedProfile, bio },
      { new: true },
    );
    await updateUser.save();
    res.status(200).json({ message: "updated successfully", updateUser });
  } catch (err) {
    res.status(500).json("error" + err);
  }
};

exports.getUsers = async (req, res) => {

  try {
    const users = await User.find({ role:"flexUp user" });
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.getTrainers = async (req, res) => {
  try {
    const trainers = await User.find({ role: "flexUp trainer" });
    return res.status(200).json(trainers);
  } catch (err) {
    return res.status(500).json(err);
  }
};
