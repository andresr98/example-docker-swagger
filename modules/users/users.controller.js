const UserService = require("./users.service");

const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();

    if (users.length == 0) {
      return res.status(404).send({ message: "No hay users" });
    }

    return res.status(200).send(users);

  } catch (error) {
    return res.status(200).send({ message: "Internal server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.getUserById(id);

    if (user == null) {
      return res.status(404).send({ message: "No se encuentra el usuario" });
    }

    return res.status(200).send(user);

  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, cel, address, password } = req.body;

    if (!firstName || !lastName || !email || !cel || !address || !password) {
      return res.status(400).send({ message: "Parámetros incorrectos" });
    }

    const user = await UserService.createUser(req.body);

    if (user == null) {
      return res.status(500).send({ message: "No se puede crear el usuario" });
    }

    return res.status(201).send(user);

  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserService.updateUserById(id, req.body);

    if (user == null) {
      return res.status(500).send({ message: "No se puede crear el usuario" });
    }

    return res.status(200).send(user);

  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.deleteUserById(id);

    if (user == null) {
      return res.status(500).send({ message: "No se puede borrar el usuario" });
    }
    
    return res.status(200).send(user);
    
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
};
