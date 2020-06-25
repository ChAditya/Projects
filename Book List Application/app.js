//Book Class
class Book {
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI Class
class UI{
    static displayBooks(){
        const books = Storage.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }
    //Create rows for new books
    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href = "#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }
    //delete selected books(Delete rows corresponding to clicked delete button)
    static deleteBook(del){
        if(del.classList.contains('delete')){
            del.parentElement.parentElement.remove();
        }
    }
    //show message when added or deleted books
    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('.book-form');
        container.insertBefore(div, form);
    }
    //clear all the input fields after adding the book to the list
    static clearFields(){
        document.querySelector('#title').value = "";
        document.querySelector('#author').value = "";
        document.querySelector('#isbn').value = "";
    }
}

//Storage Class to store books in local storage
class Storage {
    //display already existing books in the local storage
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    //add new books to local storage
    static addBook(book){
        let books = Storage.getBooks();
        books.push(book); 
        localStorage.setItem('books', JSON.stringify(books));
    }
    //remove books form local storage
    static removeBook(isbn){
        let books = Storage.getBooks();
        books.forEach((book,index) => {
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

//Add a Book
document.addEventListener('DOMContentLoaded',UI.displayBooks);
document.querySelector('.book-form').addEventListener('submit',(s) => {
    s.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    if(title === "" || author === "" || isbn === ""){
        UI.showAlert('Please fill all the fields', 'alert-danger');
        setTimeout(() => document.querySelector('.alert').remove(),3000);
    }
    else{
        const newBook = new Book(title, author, isbn);
        UI.addBookToList(newBook);
        Storage.addBook(newBook);
        UI.showAlert('Book added to list successfully..', 'alert-success');
        setTimeout(() => document.querySelector('.alert').remove(),3000);
        UI.clearFields();   //clears all the input fields after adding the book
    }
});

//Remove a Book
document.querySelector('#book-list').addEventListener('click',(c) => {
    UI.deleteBook(c.target);
    Storage.removeBook(c.target.parentElement.previousElementSibling.textContent);
    UI.showAlert('Book removed successfully..', 'alert-success');
    setTimeout(() => document.querySelector('.alert').remove(),3000);
});