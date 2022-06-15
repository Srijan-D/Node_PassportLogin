const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const passport = require("passport");

const initializePassport = require("./passport-config");
initializePassport(passport);

const users = [];

app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));
//in order to get name via req.body.name  email via req.body.email
app.get("/", (req, res) => {
  res.render("index.ejs", { name: "Srijan" });
});
app.get("/login", (req, res) => {
  res.render("login.ejs");
});
app.get("/register", (req, res) => {
  res.render("register.ejs");
});
app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.redirect("/register");
  }
  console.log(users);
});

app.listen(3000);
