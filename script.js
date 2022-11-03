const modal = document.getElementById("modal");
const form = document.getElementById("form");
const bookDisplay = document.getElementById("book-container")

function Book(name, author, pages, status) {
    this.name = name,
    this.author = author,
    this.pages = pages,
    this.status = status
};

function renderModal() {
    modal.classList.toggle("visible")
};    

form.addEventListener("submit", addBookFromInput);

let myLibrary = [new Book("Le château de Hurle", "Diana Wynne Jones", 432, true), new Book("Intelligence Artificielles", "Fibretigre, Arnold Zephir, Héloïse Chochois", 192, false)];

renderBooks()

function addBookFromInput(event) {
    event.preventDefault();
    addBookToLibrary(new Book(...getBookByForm()));
    renderBooks()
};

function getBookByForm() {
    const formInputValue = [];
    const formInput = [...document.getElementsByClassName("form__input")];
    formInput.forEach(input => formInputValue.push(input.value));
    return formInputValue
}

function addBookToLibrary(book) {
    myLibrary.push(book)
};

function renderBooks() {
    let bookDisplayHtml = ``;
    myLibrary.forEach((book) => {
        bookDisplayHtml += `
        <tr>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>
                <button type="button" class="${book.status ? "--read" : "--to-read"}">${book.status ? "Déjà lu" : "À lire"}</button>
                <div onclick="deleteBook(${myLibrary.indexOf(book)})" class="delete">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </div>
            </td>
        </tr>
        `
    });
    bookDisplay.innerHTML = bookDisplayHtml;
}

function deleteBook(index) {
    myLibrary.splice(index, 1);
    renderBooks()
}