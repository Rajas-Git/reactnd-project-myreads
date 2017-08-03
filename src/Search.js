import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class Search extends Component {
    static propTypes = {
        onUpdateBook: PropTypes.func.isRequired
    }

    state = {
        query: '',
        books: []
    }

    updateQuery = (query) => {
        if(query) { 
            BooksAPI.search(query,10).then((books) => {
                if(books &&  books.error ) {
                    this.setState( {query: query, books: [] });                    
                }
                else {
                    this.setState( {query: query, books: books });
                }
            }); 
        }
        else {
          this.setState({query: '', books: []});          
        }
        
    }

    render() {
        const { query } = this.state;
        const { onUpdateBook } = this.props;

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
                                  book={book}
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