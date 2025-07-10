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
            username:"raman"
           },   JWT_SECRET);
        res.json({
            
            token: token
        })    
    }  
})

app.get("/me", function(req, res){
    const token = req.headers.token;
    const decodedData = jwt.verify(token, JWT_SECRET);
    if(decodedData.username){

    }

    if(decodedData.username){
        let foundUser = null;
        for(let i=0; i<users.length; i++){
            if(users[i].username === username&& users[i].password === password){
                foundUser = users[i];
            }
        }
        res.json({
            username: foundUser.username,
            password: foundUser.password
        })
    }


})










