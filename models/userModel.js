const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = mongoose.Schema({
  
  name: {
    type: String,
    required: true
  }, 
 
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  }, 
 
  cin: {
    type: String,
    unique: true
  
  },
  Date_creation:{
    type:String
  }
 


});

///////////////////to get the current date with time 
let current_timedate = new Date();

// current date
// adjust 0 before single digit date
let date = ("0" + current_timedate.getDate()).slice(-2);

// current month
let month = ("0" + (current_timedate.getMonth() + 1)).slice(-2);

// current year
let year = current_timedate.getFullYear();

// current hours
let hours = current_timedate.getHours();

// current minutes
let minutes = current_timedate.getMinutes();

// current seconds
let seconds = current_timedate.getSeconds();

// prints date & time in YYYY-MM-DD HH:MM:SS format
//console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
let current= year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;


// "HOOKS"
// fire a function before we save the user to DB

//1* to save the password and no one can see it 
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
//2* to save the date of creation
userSchema.pre("save", async function (next) {
 
  this.Date_creation = current;
  next();
});



// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};





const User = mongoose.model("User", userSchema);
module.exports = User;
