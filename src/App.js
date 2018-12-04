import React from 'react';
import * as BooksAPI from './BooksAPI'
import './App.css';
import  MainPage  from './MainPage';
import  SearchPage from './SearchPage';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
  //state for books
  state = {
    books: []
  }
  //fetch books right after component render for first time
  componentDidMount() {
    BooksAPI.getAll().then(books => {
    this.setState({ books: books });
    }
   );
  }
  //Moves the Books to chosen shelf on user click
  //Call for update the books shelf value
  moveShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => 
    {this.setState({books: newBooks});});
}
  
  render() {  
    return (
      <div className="app">
      {/*Route for Main screen*/}
      <Route exact path="/" render={() => 
        <MainPage
        books={this.state.books}
        moveShelf={this.moveShelf}
        />
        } />
        {/*Route for search*/}
      <Route path="/search" render={() => 
        <SearchPage 
        books={this.state.books}
        moveShelf={this.moveShelf}
        />
        } />
      </div>
    )
  }
}

export default BooksApp;