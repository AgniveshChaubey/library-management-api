const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
  {
    username: "Agnivesh",
    password: "abc",
    review: "This is nice book!",
  },
];

const isValid = (username) => {
  //returns boolean
  if (users.find((user) => user.username === username)) {
    return false;
  }
  return true;
};

const authenticatedUser = (username, password) => {
  //returns boolean
  if (
    users.find(
      (user) => user.username === username && user.password === password
    )
  ) {
    return true;
  }
  return false;
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (authenticatedUser(username, password)) {
    const token = jwt.sign(
      { username: username, password: password },
      `${username}`
    );

    req.session.token = token;
    res.status(201).json({ message: "Login Successful!", token: token });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.user;
  const review = req.body.review;
  if (isValid(username)) {
    return res
      .status(404)
      .json({ error: "You need to register in order to add review!" });
  }
  if (!books.hasOwnProperty(isbn)) {
    return res.status(404).json({ error: "Book not found" });
  }
  const book = books[isbn];

  book.reviews[`${username}`] = review;
  res.status(200).json({ message: "Review added successfully" });
});

// Delete the book review added by that particular user
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.user;

  if (!books.hasOwnProperty(isbn)) {
    return res.status(404).json({ error: "Book not found" });
  }
  const book = books[isbn];

  if (!book.reviews.hasOwnProperty(username)) {
    return res.status(404).json({ error: "Review not found" });
  }

  delete book.reviews[username];

  return res.status(200).json({ message: "Review deleted successfully" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
