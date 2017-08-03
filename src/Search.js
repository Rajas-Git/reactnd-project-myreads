import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class Search extends Component {
    static propTypes = {
        onUpdateBook: PropTypes.func.isRequired,
        currentBooksMap: PropTypes.object.isRequired
    }

    state = {
        query: '',
        books: []
    }

    getUniqBooks(books) {
        let outBooks = [];
        let idSet = new Set();
        for(let book of books) {
            if(book.id && !idSet.has(book.id)) {
                idSet.add(book.id);
                outBooks.push(book);
            }
        }
        return outBooks;
    }

    updateQuery = (query) => {
        if(query !== "" ) { 
            this.setState({ query });

            BooksAPI.search(query,10).then((books) => {
                if(books &&  !books.error ) {
                    if(query === this.state.query) {
                        books = this.getUniqBooks(books);
                        this.setState( { books: books });                                     
                    }
                }
                else {
                    this.setState( {query: query, books: [] });   
                }
            }); 
        }
        else {
          this.setState({query: '', books: []});          
        }
        
    }

    // Fix because search API reports inconsistent bookshelf when compared to getAll API
    getBook = (currentBooksMap, book) => {
        if (currentBooksMap.has(book.id)) {
            book.shelf = currentBooksMap.get(book.id);
        } 
        else {
            book.shelf = "none";
        }
        return book;
    }

    render() {
        const { query } = this.state;
        const { onUpdateBook, currentBooksMap } = this.props;

        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link 
                        className="close-search"
                        to="/"
                    >
                    Close
                    </Link>

                    <div className="search-books-input-wrapper">
                        <input 
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>

                <ol className="books-grid">
                        {this.state.books.map((book, index) =>
                                                           
                            <li key={index}>
                              <Book 
                                  book={ this.getBook(currentBooksMap,book) }
                                  onUpdateBook={onUpdateBook}
                              />
                            </li>                        
                        )}                         
                </ol>
            </div>
        );
    }
}

export default Search;