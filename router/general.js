const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (isValid(username)) {
    users.push({ username, password });
    res.json({ message: "Registered Successfully!", user: username });
  } else {
    res.send("User already exist!");
  }
});

public_users.get("/books", (req, res) => {
  res.send(books);
});

// Get the book list available in the shop
public_users.get("/", async function (req, res) {
  res.json(books);
});

// // Get book details based on ISBN
// public_users.get("/isbn/:isbn", function (req, res) {
//   const isbn = req.params.isbn;
//   if (books.hasOwnProperty(isbn)) {
//     res.json(books[isbn]);
//   } else {
//     res.status(404).json({ error: "Book not found" });
//   }
// });

// Get book details based on ISBN (Using Promises)
public_users.get("/isbn/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  searchBookByISBN(isbn)
    .then((book) => {
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({ error: "Book not found" });
      }
    })
    .catch((error) => {
      console.error("Error searching book by ISBN:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

function searchBookByISBN(isbn) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (books.hasOwnProperty(isbn)) {
        resolve(books[isbn]);
      } else {
        resolve(null);
      }
    }, 1000);
  });
}

// // Get book details based on author
// public_users.get("/author/:author", function (req, res) {
//   const author = req.params.author;
//   const book = Object.values(books).filter((book) => book.author === author);
//   if (book) {
//     res.send(book);
//   } else {
//     res.status(404).json({ error: "Book not found!" });
//   }
// });

// // Get book details based on author (using Prmoises)
public_users.get("/author/:author", function (req, res) {
  const author = req.params.author;

  searchBooksByAuthor(author)
    .then((books) => {
      if (books.length > 0) {
        res.json(books);
      } else {
        res.status(404).json({ error: "No books found by the author" });
      }
    })
    .catch((error) => {
      console.error("Error searching books by author:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

function searchBooksByAuthor(author) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const matchingBooks = Object.values(books).filter(
        (book) => book.author === author
      );
      resolve(matchingBooks);
    }, 1000);
  });
}

// // Get all books based on title
// public_users.get("/title/:title", function (req, res) {
//   const title = req.params.title;
//   const book = Object.values(books).filter((book) => book.title === title);
//   if (book) {
//     res.json(book);
//   } else {
//     res.status(404).json({ error: "No books found with the provided title" });
//   }
// });

// Get all books based on title (using Promsies)
public_users.get("/title/:title", function (req, res) {
  const title = req.params.title;

  searchBooksByTitle(title)
    .then((books) => {
      if (books.length > 0) {
        res.json(books);
      } else {
        res
          .status(404)
          .json({ error: "No books found with the provided title" });
      }
    })
    .catch((error) => {
      console.error("Error searching books by title:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

function searchBooksByTitle(title) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const matchingBooks = Object.values(books).filter(
        (book) => book.title === title
      );
      resolve(matchingBooks);
    }, 1000);
  });
}

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  if (books.hasOwnProperty(isbn)) {
    res.json(books[isbn].reviews);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

module.exports.general = public_users;
