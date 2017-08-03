import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        onUpdateBook: PropTypes.func.isRequired
    }


    render() {
        const { book, onUpdateBook } = this.props;
        return(
            <div className="book" >
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${ book.imageLinks? book.imageLinks.thumbnail : '' })` }} />
                    <div className="book-shelf-changer">
                        <select 
                            value={book.shelf}
                            onChange={(event) => onUpdateBook(book, event.target.value)}
                        >
                        <option value="unused" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                        </select>
                    </div>
                </div>  
                <div className="book-title"> {book.title? book.title : ""} </div>
                <div className="book-authors"> {book.authors? book.authors.join(", ") : "" } </div>                                   
            </div>
        );
    }
}

export default Book;