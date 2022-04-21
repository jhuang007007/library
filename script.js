let myLibrary = [];

function Book(author, title, pages, read) {
  this.author = author
  this.title = title
  this.pages = pages
  this.read = read
  this.index = myLibrary.length
} 

const bookPrototype = {
  toggleRead() {
    this.read = !this.read;
  }
} 

Book.prototype = bookPrototype;

function addBookToLibrary(e) {
  e.preventDefault(); //prevent refresh and default button behavior

  //store user input into new "Book" object
  let book = new Book(
    document.querySelector('#author').value,
    document.querySelector('#title').value,
    document.querySelector('#pages').value,
    document.querySelector('#read').value
  );
  myLibrary.push(book);
  document.querySelector('form').reset(); //clear form for new entries
  addNewBookEventHandler();
  displayBooks();
}

// loops through the array and displays each book on the page
function displayBooks() {
  const library = document.querySelector(".library");
  let randomColor = Math.floor(Math.random()*16777215).toString(16);

  //create new elements
  const author = document.createElement("h3");
  const title = document.createElement("h2");
  const pages = document.createElement("p");
  const read = document.createElement("p");

  //create toggle read button
  const readButton = document.createElement("button");
  readButton.classList.add('toggle-read');
  readButton.textContent = 'Toggle Read';

  //create delete book button
  const deleteButton = document.createElement("button");
  deleteButton.classList.add('delete-book');
  deleteButton.textContent = 'Delete book';

  const newBook = document.createElement("div");
  newBook.classList.add('book');
  newBook.style.backgroundColor = "#" + randomColor;
  library.appendChild(newBook);

  //loop array values into DOM 
  myLibrary.forEach(book => {
    author.textContent = `by ${book.author}`;
    title.textContent = book.title;
    pages.textContent = `${book.pages} pages`;
    read.textContent = book.read ? "Status: Read":"Status: Unread";

    newBook.appendChild(title);
    newBook.appendChild(author);
    newBook.appendChild(pages);
    newBook.appendChild(read);
    newBook.appendChild(readButton);
    newBook.appendChild(deleteButton);

    //toggle read status
    readButton.addEventListener("click", () => {
      book.toggleRead();
      read.textContent = book.read ? "Status: Read":"Status: Unread";
    });

    //delete book from DOM and myLibrary array
    deleteButton.addEventListener("click", () => {
      myLibrary.splice(book.index, 1);
      newBook.remove(title);
      newBook.remove(author);
      newBook.remove(pages);
      newBook.remove(read);
      newBook.remove(readButton);
      newBook.remove(deleteButton);
    });
  });
}

//adds book to libary on submit button click
document.getElementById('add-book-form').onsubmit = addBookToLibrary; 

//unhide form on "add new book" button click
document.querySelector('#add-book-button').addEventListener("click", addNewBookEventHandler)

function addNewBookEventHandler() {
  if (document.querySelector('#add-book-form').classList.contains('hidden')) {
    document.querySelector('#add-book-form').classList.remove('hidden');
    document.querySelector('#add-book-button').textContent = "Cancel"
  } else {
    document.querySelector('#add-book-form').classList.add('hidden');
    document.querySelector('#add-book-button').textContent = "Add new book"
  }
}