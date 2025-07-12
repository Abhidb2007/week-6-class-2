const express = require("express");
const jwt = require(jsonwebtoken);

const app =express();

const users=[];
app.post("/signup",function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    const push=({
        username : username,
        password : password
    })
    res.json({
        message:"you are signed in"
    })
})
app.post("/signin",function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    let foundUser = null;

    for(let i=0; i<users.length; i++){
        if(users[i].username===username && users[i].password===password){

        }
    }
    if(!foundUser){
        res.json({
            message:"Credentials incorrect"
        })
        return
    }else{
        const token = jwt.sign({
            username
        },JWT_SECRET);
    }
    res.json({
        tooken:token
    })

})
app.post("/me",function(req, res){

})

app.listen(3000);
