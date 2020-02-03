const KEY = 'books';
const BOOKS_IN_PAGE = 4;

var gCurrPage = 1;
var gBooks = _createBooks();

function getBooksForDisplay() {
    var from = (gCurrPage - 1) * BOOKS_IN_PAGE;
    var to = from + BOOKS_IN_PAGE;
    return gBooks.slice(from, to);
}

function getBookCount() {
    return gBooks.length;
}

function removeBook(bookId) {
    var idx = gBooks.findIndex(book => book.id === bookId);
    gBooks.splice(idx, 1);
    saveToStorage(KEY, gBooks);
}

function getBook(bookId) {
    return gBooks.find(book => book.id === bookId)
}

function getBookByName(bookName) {
    return gBooks.find(book => book.name === bookName);
}

function addBook(name, price) {
    if (getBookByName(name) !== undefined) {
        return;
    }
    var book = _createBook(name, price);
    gBooks.unshift(book);
    saveToStorage(KEY, gBooks);
}

function updateBook(book) {
    var idx = gBooks.findIndex(currBook => currBook.id === book.id)
    gBooks[idx] = book;
    saveToStorage(KEY, gBooks);
}

function changePage(diff) {
    gCurrPage += diff;
    var lastPage = Math.ceil(gBooks.length / BOOKS_IN_PAGE);
    if (gCurrPage > lastPage) gCurrPage = 1;
    else if (gCurrPage < 1) gCurrPage = lastPage;
}

function _createBooks() {
    var books = loadFromStorage(KEY);
    if (books) return books;

    var books = [{ name: 'dune', price: 79, rating: 9 },
        { name: 'green mile', price: 39, rating: 4 },
        { name: 'hobbit', price: 49, rating: 2 },
        { name: 'harry potter', price: 29, rating: 2 },
        { name: 'eloquent js', price: 39, rating: 6 },
        { name: 'the little prince', price: 29, rating: 2 },
        { name: 'the art of war', price: 59, rating: 7 },
        { name: 'alice in wonderland', price: 39, rating: 6 }
    ].map(_createBook);

    return books;
}

function _createBook(bookObj) {
    return {
        id: parseInt(Math.random() * 1000),
        name: bookObj.name,
        price: bookObj.price,
        rating: bookObj.rating,
        imgUrl: bookObj.name
    }
}