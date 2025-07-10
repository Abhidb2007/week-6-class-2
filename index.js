const express = require('express');
const jwt = require("jsonwebtoken");
const app = express();
const users = []

app. post("/signup",function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    users.push({
        username: username,
        password: password
    })
    //we should check if the user already exists
    res.json({
        message: "you are signed in"

    })

})
app.post("/signin", function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    let foundUser = null;
    for(let i=0; i<users.length,i++){
        if(users[i].username === username && users[i].password === password){
            foundUser = user[i]
        }
    }
    if(!foundUser){
        res.json({
            message: "Credintials are incorrect"
        })
    }else{
        const token  = jwt.sign({
            username
           },   JWT_SECRET);
        res.json({
            
            token: token
        })    
    }  
})

app.get("/signup", function(req, res){

})


// middleware/auth.js
const jwt = require("jsonwebtoken");

const JWT_SECRET = "my-secret-key"; // should be in .env in real apps

function authMiddleware(req, res, next) {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ message: "Access Denied. No Token Provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // attach decoded user to request
    next(); // go to next middleware or route
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
}

module.exports = authMiddleware;
