import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';
import DebounceInput from 'react-debounce-input';

class SearchPage extends Component {
  //state defined for query and searchedBooks
  state = {
    query: '',  
    searchedBooks: [],
    resultsNotAvailable: false
  }
  //as user types in search, query will be updating
  updateQuery = query => {
    this.setState({
      query: query
    })
    this.updateSearchedBooks(query);
  }

  //updates the books on query(input) 
  updateSearchedBooks = query => {
    if (query) {
      BooksAPI.search(query).then((searchedBooks) => {
        if (searchedBooks.error) {
          this.setState({ searchedBooks: [] });
        } else {
          this.setState({ searchedBooks: searchedBooks });
        }
      })
  } else {
        this.setState({ searchedBooks: [], resultsNotAvailable: true });
    }
  }
  
	render() {
    const { query, resultsNotAvailable } = this.state;
	return (
		<div className="search-books">
            <div className="search-books-bar">
            {/*React Link for close button*/}
              <Link
                to="/"
                className="close-search"
                >Close</Link>

              <div className="search-books-input-wrapper">
              <DebounceInput
                  type="text"
                  placeholder="Search by title or author"
                  value={this.state.query}
                  DebounceTimeout={1000}
                  onChange={(event) => this.updateQuery(event.target.value)}
              />
              </div>
            </div>
           <div className="search-books-results">
           <ol className="books-grid">
            {
              this.state.searchedBooks.map(searchedBook => {
                let shelf = "none";
                /* Keep or change shelf status as available books if searched books available already */
                this.props.books.map(book => searchedBook.id === book.id ? shelf = book.shelf : '' );
              
              return (
              <li key={searchedBook.id}>
                  <Book 
                   book={searchedBook}
                   moveShelf={this.props.moveShelf}
                   currentShelf={shelf}
                   />
              </li>  
              );
            })
            }
           </ol>
           { resultsNotAvailable && query && (
            <p className="books-grid">
              Books not found.
            </p>)
              }
              </div>
          	</div>
        );
 }
}

export default SearchPage;