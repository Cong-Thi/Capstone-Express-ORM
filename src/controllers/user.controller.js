const { AppError } = require("../helper/error");
const response = require("../helper/response");
const userService = require("../services/user.service");

const getUsers = () => {
  return async (req, res, next) => {
    try {
      const users = await userService.getUsers();
      res.status(200).json(response(users));
    } catch (error) {
      next(error);
    }
  };
};

const getUserById = () => {
  return async (req, res, next) => {
    try {
      const { userId } = req.params;

      const user = await userService.getUserById(userId);

      res.status(200).json(response(user));
    } catch (error) {
        next(error);
    }
  };
};

const createUser = () => {
  return async (req, res, next) => {
    try {
      const data = req.body;
      const createdUser = await userService.createUser(data);
      res.status(200).json(response(createdUser));
    } catch (error) {
      next(error);
    }
  };
};

const updateUser = () => {
    return async (req, res, next) => {
        try {
            const { userId } = req.params;
            const data = req.body;
            
            const user = await userService.updateUser(userId,data);

            res.status(200).json(response(user));
        } catch (error) {
            next(error);
        }
    }
}

const deleteUser = () => {
  return async (req, res, next) => {
    try {
      const { userId } = req.params;
      const createdUser = await userService.deleteUser(userId);
      res.status(200).json(response(true));
    } catch (error) {
      next(error);
    }
  };
};

const uploadAvatar = () => {
  return async (req, res, next) => {
    try {
      const { userId } = req.params;
      const file = req.file;
      
      if(!file){
        next(new AppError(400, "Please upload a file"));
      }

      file.path = file.path.replace("/\\/g","/")
      const url = `http://localhost:4000//${file.path}`;
    
      const user = await userService.uploadAvatar(userId, url);

      res.status(200).json(response(user));
    } catch (error) {
      next(error);
    }
  }
}


module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    uploadAvatar,
}
