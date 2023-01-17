const { AppError } = require("../helper/error");
const { User } = require("../models");

const getUserById = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError(400, "User not found");
    }

    return user;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (userId, data) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new AppError(400, "User not found");
  }

  await User.update(data, { where: { userId } });

  const updatedUser = User.findByPk(userId);
  return updatedUser;
};

const uploadAvatar = async(userId,url) => {
    try {
        const user = await User.findOne({where: {userId}});
        if(!user){
            throw new AppError(400, "User not found");
        }
        const data = {...user, avatar: url};
        
        await User.update({...user, avatar},{ where: { userId } });
        
    } catch (error) {
        throw error
    }
    
}

module.exports = {
  getUserById,
  updateUser,
  uploadAvatar,
};
