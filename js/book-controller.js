'use strict';

function onInit() {
    renderBooks();
}

function renderBooks() {
    var books = getBooksForDisplay();
    var strHTMLs = books.map(function(book) {
        return `<tr>
            <td>${book.id}</td>
            <td>${book.name}</td>
            <td>Price: ${book.price} $</td>  
            <td>Rating: ${book.rating}</td>  
            <td>
            <button class="button read" onclick="onShowBookDetails(event, ${book.id})">Read</button>
            <button class="button update" onclick="onEditBook(event, ${book.id})">Edit</button>
            <button class="button delete" onclick="onRemoveBook(event, ${book.id})">Delete</button>
            </td>
            </tr>`
    });
    var elBookList = document.querySelector('.book-table');
    elBookList.innerHTML = strHTMLs.join('');
}

function onAddBook() {
    document.querySelector('.book-edit h2').innerText = 'Add';
    show('.book-edit');
}

function onRemoveBook(event, bookId) {
    event.stopPropagation();
    var isSure = confirm('Are you sure?');
    if (isSure) {
        removeBook(bookId);
        renderBooks();
    }
    if (getBookCount() === 0) {
        localStorage.clear();
        show('.book-edit');
    }
}

function onEditBook(event, bookId) {
    document.querySelector('.book-edit h2').innerText = 'Edit';
    show('.book-edit');
    var book = getBook(bookId);
    var elTxtPrice = document.querySelector('.txt-price');
    elTxtPrice.value = book.price;
    var elTxtName = document.querySelector('.txt-name');
    elTxtName.value = book.name;
    elTxtName.dataset.id = bookId;
    updateBook(book);
    event.stopPropagation();
}

function onSaveBook() {

    var elTxtName = document.querySelector('.txt-name');
    var elTxtPrice = document.querySelector('.txt-price');
    var name = elTxtName.value;
    var price = elTxtPrice.value;
    if (!name || !price) return;

    var bookId = +elTxtName.dataset.id;
    if (bookId) {
        var book = getBook(bookId);
        book.name = name;
        book.price = price;
        updateBook(book);
    } else {
        addBook(name, price);
    }

    elTxtName.value = '';
    elTxtName.dataset.id = '';
    elTxtPrice.value = '';
    hide('.book-edit');
    renderBooks();
}

function onShowBookDetails(event, bookId) {
    var book = getBook(bookId);
    var elModal = document.querySelector('.modal');
    //add a default picture in case of missing picture.
    elModal.querySelector('img').src = `img/${book.imgUrl}.jpg`;
    elModal.querySelector('h2').innerText = book.name;
    elModal.querySelector('h4').innerText = book.price + " $";
    elModal.querySelector('.number').value = +book.rating;
    show('.modal');
}

function onCloseEdit() {
    document.querySelector('.txt-name').value = '';
    document.querySelector('.txt-price').value = '';
    hide('.book-edit');
}

function onCloseModal() {
    var bookName = document.querySelector('.modal h2').innerText;
    var book = getBookByName(bookName);
    book.rating = document.querySelector('.number').value;
    updateBook(book);
    renderBooks();
    hide('.modal')
}

function onChangePage(diff) {
    changePage(diff);
    renderBooks();
}

function show(elementToShow) {
    var element = document.querySelector(`${elementToShow}`);
    element.hidden = false;
}

function hide(elementToHide) {
    var element = document.querySelector(`${elementToHide}`);
    element.hidden = true;
}

function increaseValue() {
    var value = parseInt(document.querySelector('.number').value, 10);
    if (value >= 10) return;
    value++;
    document.querySelector('.number').value = value;
}

function decreaseValue() {
    var value = parseInt(document.querySelector('.number').value, 10);
    value < 1 ? value = 1 : '';
    value--;
    document.querySelector('.number').value = value;
}