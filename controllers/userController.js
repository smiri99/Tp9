const User = require("../models/userModel");



const getAllUsers = async (req, res) => {
  try{
    const users = await User.find();
    res.status(200).json({
    success: "True",
    data : users
    }); 
  } catch(err){
        res.status(404).json({
          success: "false",
        msg:err
        
      })
  }
};



const updateUser =async(req, res) => {
  try{

    console.log(req.body)
    console.log(req.params)
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
      runValidators: true
    });
    console.log(user,"up");
    res.status(200).json({
    success: "PATCH user route has been executed",
    data : user
    });
  } catch(err){      
    err => console.log(err);
  }
};




const getUser = async (req, res) => {

  try{
    const user = await User.find({name:req.params.name});
    console.log(req.params.name)
    res.status(200).json({
    success: "True",
    data : user
    }); 
   
  } catch(err){
    err => console.log(err);
  }
};
const deleteUser = async (req, res) => {
  try{
    const user = await User.findByIdAndDelete(req.params.userId);
    console.log(user,"Deleted");
    res.status(200).json({
    success: "True",
    data : user
    }); 
  } catch(err){
    err => console.log(err);
  }
};







module.exports = {
  
  getAllUsers,
  updateUser,
  getUser,
  deleteUser,
 
};
