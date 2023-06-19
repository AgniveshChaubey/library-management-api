const express = require("express");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const customer_routes = require("./router/auth_users.js").authenticated;
const genl_routes = require("./router/general.js").general;

const app = express();

app.use(express.json());

app.use(
  "/customer",
  session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/customer/auth/*", function auth(req, res, next) {
  const token = req.session.token;
  if (!token) {
    res.status(401).json({ error: "Unauthorized!" });
  }
  try {
    const payload = jwt.verify(token, `${req.body.username}`);
    req.user = payload.username;
    req.passwd = payload.password;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
});

const PORT = process.env.PORT || 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running on:", PORT));
