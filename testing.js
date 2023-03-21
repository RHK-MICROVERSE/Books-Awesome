/* Checking local storage if undefined will creeate an empty array */
let bookCollection = JSON.parse(localStorage.getItem('BOOKS')) || [];

// Get Document references to manupulate
const bookList = document.getElementById('book-list');
const addForm = document.getElementById('add-form');
const titleInput = document.getElementById('book-title');
const authorInput = document.getElementById('book-author');

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  addBook() {
    let book = {}
    book.title = this.title;
    book.author = this.author;
    
    if (localStorage.getItem('BOOKS') === null) {
      localStorage.setItem('BOOKS', []);
      bookCollection.push(book);
      localStorage.setItem('BOOKS', JSON.stringify(bookCollection));
    } else {
      bookCollection.push(book);
      localStorage.setItem('BOOKS', JSON.stringify(bookCollection));
    }
  }

  removeBook(index) {
    console.log('trying to remove book');
    bookCollection = bookCollection.filter((book, ref) => ref !== +index);
    localStorage.setItem('BOOKS', JSON.stringify(bookCollection));
  }
}

// Function to render the book list
function renderBookList() {
  bookList.innerHTML = bookCollection
    .map(
      (book, ref) => ref % 2 === 0 ? ` 
          <div class="bookslist-container grey">
            <div class="book-info">
              <li>
                "${book.title}" by
              </li>
              <li>
                ${book.author}
              </li>
            </div>
            <button class='rm-btn' 
            id="remove-btn"
            data-index='${ref}'>Remove
            </button>        
          </div>
        ` : `
          <div class="bookslist-container">
            <div class="book-info">
              <li>
                "${book.title}" by
              </li>
              <li>
                ${book.author}
              </li>
            </div>
            <button class='rm-btn' 
            id="remove-btn"
            data-index='${ref}'>Remove
            </button>        
          </div>
        `,
    )
    .join('');
}

// Declaring Rendering of the Book List
renderBookList();

/* EVENT LISTENER ONE: add book SUBMIT
Add a new book to the collection when clicked submit
- Confirm the title and Authour value exists
- Call the addBook Function to add book in BookCollection
- Call the renderBookList function to refresh the BookList
- Reset the Form for new book addition */
addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = titleInput.value;
  const author = authorInput.value;
  if (title && author) {
    // Function to add title and author, refresh Booklist.
    let newBook = new Book(title, author);
    newBook.addBook()
    // addBook(title, author);
    renderBookList();
    addForm.reset();
  }
});

/* EVENT LISTENR TWO: click REMOVE
- Call the removeBook Function to rmove book from BookCollection
- Call the renderBookList function to refresh the BookList */
bookList.addEventListener('click', (e) => {
  if (e.target.matches('.rm-btn')) {
    const bookIndex = e.target.dataset.index;
    // A function to remove book
    let newBook = new Book();
    newBook.removeBook(bookIndex);
    // removeBook(bookIndex);
    renderBookList();
  }
});