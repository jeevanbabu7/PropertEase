import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'

export const test = (req,res) => {
    res.send("hii") 
}
export const updateUserInfo = async (req, res, next) => {
    if (req.user.id !== req.params.id)
      return next(errorHandler(401, 'You can only update your own account!'));
    try {
      if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }
      console.log(req.body);
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
          },
        },
        { new: true }
      );
  
      const { password, ...rest } = updatedUser._doc;
      
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };

  export const deleteUser = async (req, res, next) => {
    console.log("hii");
    if (req.user.id !== req.params.id)
      return next(errorHandler(401, 'You can only delete your own account!'));


    try {
      
      await User.findByIdAndDelete(req.params.id);
      res.clearCookie('access_token');
      res.status(200).json('User has been deleted!');
      console.log("deleted");

    } catch (error) {
      next(error);
    }
  };

  export const getUsers = async (req,res,next) => {
    try {
      const data = await User.find();
      res.status(200).json(data);
    }catch(err) {
      next(err)
    }
  }


  export const deteUsersForAdmin = async (req,res,next) => {
    try {
      const result = await User.findByIdAndDelete(req.params.id);
      console.log(result)
      res.status(200).json(result)
    }
    catch(err)  {
      next(err)
    }
  }