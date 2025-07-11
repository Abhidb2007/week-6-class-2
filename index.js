const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json()); // <-- Needed to parse JSON body

const JWT_SECRET = "my-secret-key"; // <-- Define secret key
const users = [];

// SIGN UP Route
app.post("/signup", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  // Check if user already exists
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ username, password });

  res.json({ message: "You are signed up" });
});

// SIGN IN Route
app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const foundUser = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!foundUser) {
    return res.json({ message: "Credentials are incorrect" });
  }

  const token = jwt.sign({ username: username }, JWT_SECRET);
  res.header("jwt",token);
  res.header("random","harkirat");
  res.json({
    token:token
  })
});

function auth(req, res, next){
  const token = req.headers.token;
  const decodedData = jwt.verify(token,JWT_SECRET);
  if(decodedData){
    next();
  }else{
    res.json({
      message: "You are not logged in"
    })

  }
  
}
// PROTECTED Route - /me
app.get("/me", auth, function (req, res) {
  const token = req.headers.token;

  try {
    const decodedData = jwt.verify(token, JWT_SECRET);
    const username = decodedData.username;

    const foundUser = users.find((user) => user.username === username);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      username:username,
      password:password,
    });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

app.get("/todo",function(req, res){
  const token = req.headers.token;
  if(decodedData.username ){
  }else{
    res.json({
      message: "you are not logged in"
    })
  }
  
})

app.listen(4000, () => {
  console.log("Server is running on port 3000");
});

