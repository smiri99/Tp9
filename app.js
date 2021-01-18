require("dotenv").config();
const x= require("./helpers/initMongodb");
const express = require("express");
const app = express();
const morgan = require("morgan");
/////routes
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");



if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }
  
  
  app.use(express.json());
  app.set('view-engine','ejs')
  app.use(express.urlencoded({extended: false}))
// api routes
app.use("/api/v1/auth",authRouter);

app.use("/api/v1/users",userRouter);

// register view engine
app.set('view engine', 'ejs');
app.set('views', './views'); // (ejsViewsAreIn, this location)
app.get('/ejs/allusers',(req,res)=>{
    res.render('allusers.ejs')
})
app.get('/ejs/login',(req,res)=>{
    res.render('login.ejs')
})
app.get('/ejs/signup',(req,res)=>{
    res.render('signup.ejs')
})







// Running the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
});