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
  res.json({ token });
});

// PROTECTED Route - /me
app.get("/me", function (req, res) {
  const token = req.headers.token;

  try {
    const decodedData = jwt.verify(token, JWT_SECRET);
    const username = decodedData.username;

    const foundUser = users.find((user) => user.username === username);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      username: foundUser.username,
      password: foundUser.password,
    });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

