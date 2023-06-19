// Task 10

const { json } = require("express")
const books = require("./router/booksdb")

const getAllBooks = async () => {
    try {
        const allBooksPromise = await Promise.resolve(books)

        if (allBooksPromise) {
            return allBooksPromise
        } else {
            return Promise.reject(new Error("No book found."))
        }
    } catch (err) {
        console.log(err)
    }
}

public_users.get('/', async function (req, res) {
    const data = await getAllBooks()
    res.json(data)
})


//Task 11

const getBooksDetailsByISBN = async isbn => {
    try {
        const ISBNPromise = await Promise.resolve(isbn)
        if (ISBNPromise) {
            return Promise.resolve(isbn)
        } else {
            return Promise.reject(new Error('Could not retrive ISBN Promise.'))
        }
    } catch (err) {
        console.log(err)
    }
}

public_users.get('/isbn/:isbn', async function (req, res) {
    const isbn = req.params.isbn
    const data = await getBooksDetailsByISBN(isbn)
    res.send(data[data])
})


//12

const findAuthor = async author => {
    try {
        if (author) {
            const newAuthorArray = []
            Object.values(books).map(book => {
                if (book.author === author) {
                    newAuthorArray.push(book)
                }
            })
            return Promise.resolve(newAuthorArray)
        } else {
            return encodeURIComponent('Could not retrive Author Promise.')
        }
    }
    catch (err) {
        console.log(err)
    }
}

public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author
    const data = await findAuthor(author)
    res.send(data)
})


//Task 13

const findTitle = async title => {
    try {
        if (title) {
            const newTitleArray = []
            Object.values(books).map(book => {
                if (book.title === title) {
                    newTitleArray.push(book)
                }
            })
            return Promise.resolve(newTitleArray)
        } else {
            return Promise.reject(
                new Error('Could not retrive Author promise.')
            )
        }
    } catch (err) {
        console.log(err)
    }
}

public_users.get('/title/:title', async function(req, res){
    const title = req.params.title
    const data = await findTitle(title)
    res.send(data)
})

//github link