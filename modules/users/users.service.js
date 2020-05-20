const User = require("./users.model");

const getAllUsers = async () => {
  const users = await User.find({});
  return users;
};

const getUserById = async (id) => {
  try {
    const user = await User.findById(id).exec();
    return user;
  } catch (error) {
    return null;
  }
};

const createUser = async (userData) => {
  const user = await User.create(userData);
  return user;
};

const deleteUserById = async (id) => {
  try {
    const user = await User.findByIdAndDelete(id).exec();
    return user;
  } catch (error) {
    return null;
  }
};

const updateUserById = async (id, userData) => {
  try {
    const user = await User.findByIdAndUpdate(id, userData, {
      new: true,
    }).exec();
    return user;
  } catch (error) {
    return null;
  }
};

module.exports = {
  getAllUsers: getAllUsers,
  getUserById: getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
