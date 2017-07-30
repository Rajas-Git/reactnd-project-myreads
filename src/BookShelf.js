import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';

class BookShelf extends Component {
    static propTypes = {
        shelfTitle: PropTypes.string.isRequired,
        
        
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
                              <div className="book" >
                                <div className="book-top">
                                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                    <div className="book-shelf-changer">
                                      <select 
                                        value={book.shelf}
                                        onChange={(event) => onUpdateBook(book,event.target.value)}
                                      >
                                        <option value="none" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                      </select>
                                    </div>
                                </div>  
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.authors.map((author,index) => index>0? ', '+ author : author )}</div>                                   
                              </div>
                            </li>
                        
                        )}
                         <li>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' }}></div>
                            <div className="book-shelf-changer">
                              <select>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">To Kill a Mockingbird</div>
                          <div className="book-authors">Harper Lee</div>
                        </div>
                      </li>
                    </ol>
                    </div>
                </div>
            </div>
        );
    }
}

export default BookShelf;