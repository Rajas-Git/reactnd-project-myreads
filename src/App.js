import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import logo from './logo.svg';
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
      this.setState({ books: books });
    });
  }

updateBook = (book,newShelf) => {
  BooksAPI.update(book,newShelf);
  BooksAPI.getAll().then((books) => {
    this.setState({ books: books});
  });
}


  render() {
    return (  //TODO: What's the deal with history.push ?
      <div className="app">
        <Route exact path='/search' render={() => (
          <Search 
            
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
