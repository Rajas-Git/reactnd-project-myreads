import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import Book from './Book';

// component for a Book Shelf
class BookShelf extends Component {
    static propTypes = {
        shelfTitle: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        onUpdateBook: PropTypes.func.isRequired
    }

    render() {
        const { shelfTitle, books, onUpdateBook } = this.props;

        return (
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{shelfTitle}</h2>
                    <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book, index) =>
                            <li key={index}>
                              <Book
                                book={book}
                                onUpdateBook={onUpdateBook}
                              />
                            </li>
                        )}
                    </ol>
                    </div>
                </div>
            </div>
        );
    }
}

export default BookShelf;