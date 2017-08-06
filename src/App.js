import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf';
import Search from './Search';

class BooksApp extends Component {
  state = {
    books : []
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  updateBook = (modBook,newShelf) => {
    BooksAPI.update(modBook,newShelf).then(() => {
      // Update the local state. getAll API is buggy (gives inconsistent results for bookshelves for same books when compared to search API)
      modBook.shelf = newShelf;
      let books = this.state.books;
      for(let book of books) {
        if(book.id === modBook.id) {
            book.shelf = newShelf;
            this.setState({ books: books});
            return;
        }
      }
      this.setState({ books: books.concat(modBook)});
    });
  }

  // Function to get a map of book.id --> book.shelf
  // Used to get a map of books added to any of the three shelves
  getBookMap = () => {
    let bookMap = new Map();
    if (this.state.books) {
      this.state.books.map((book) => {
        return bookMap.set(book.id, book.shelf);
      });
    }
    return bookMap;
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <Search
              onUpdateBook = {this.updateBook}
              currentBooksMap = {this.getBookMap()} // pass a map of books added to any of the shelves
          />
        )}/>

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>My Reads</h1>
            </div>
              <div className="list-books-content">
                <BookShelf
                    books={this.state.books.filter((book)=> book.shelf === 'currentlyReading')}
                    shelfTitle="Currently Reading"
                    onUpdateBook={this.updateBook}
                />
                <BookShelf
                    books={this.state.books.filter((book) => book.shelf === 'wantToRead')}
                    shelfTitle="Want to Read"
                    onUpdateBook={this.updateBook}
                />
                <BookShelf
                    books={this.state.books.filter((book)=> book.shelf === 'read' )}
                    shelfTitle="Read"
                    onUpdateBook={this.updateBook}
                />
              </div>
            <div className="open-search">
              <Link
                  to='/search'
              >
              Add a book
              </Link>
            </div>
          </div>
        )}/>

      </div>
    );
  }
}

export default BooksApp;
