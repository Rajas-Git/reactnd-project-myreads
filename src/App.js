import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf';

class BooksApp extends Component {
  state = {
    /*
      TODO: Maintain state of books here.

    */
    books : []

  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {      
      this.setState({ books: books });
    });
  }

updateBook = (book,newShelf) => {
  console.log("Updated Book: " + book.title + newShelf);
}


  render() {
    return (
      <div className="app">
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
        </div>
      </div>
    );
  }
}

export default BooksApp;
