/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 *
 */
import React from 'react';
import request from '../../utils/request';

class Menu extends React.Component {

  /**
   * Main constructor for the Menu Class
   * @memberof Menu
   */
  constructor() {
    super();
    this.state = {
      showingSearch: false,
      txtSearch: '',
      searchResults: []
    };
  }

  /**
   * Shows or hides the search container
   * @memberof Menu
   * @param e [Object] - the event from a click handler
   */
  showSearchContainer(e) {
    e.preventDefault();
    this.setState({
      showingSearch: !this.state.showingSearch,
      txtSearch: '',
      searchResults: []
    });
  }

  /**
   * Calls upon search change
   * @memberof Menu
   * @param e [Object] - the event from a text change handler
   */
  onSearch(e) {
    const that = this;
    const txtSearch = e.currentTarget.value;
    if (txtSearch && txtSearch.length > 2) {
      request(`http://localhost:3035?txtSearch=${txtSearch}`).then(function (result) {
        that.setState({
          txtSearch: txtSearch,
          searchResults: result
        })
      });
    } else {
      that.setState({
        txtSearch: txtSearch,
        searchResults: []
      })
    }
  }

  /**
   * Renders the default app in the window, we have assigned this to an element called root.
   *
   * @returns JSX
   * @memberof App
   */
  render() {
    return (
      <header className="menu">
        <div className="menu-container">
          <div className="menu-holder">
            <h1>ELC</h1>
            <nav>
              <a href="#" className="nav-item">HOLIDAY</a>
              <a href="#" className="nav-item">WHAT'S NEW</a>
              <a href="#" className="nav-item">PRODUCTS</a>
              <a href="#" className="nav-item">BESTSELLERS</a>
              <a href="#" className="nav-item">GOODBYES</a>
              <a href="#" className="nav-item">STORES</a>
              <a href="#" className="nav-item">INSPIRATION</a>

              <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                <i className="material-icons search">search</i>
              </a>
            </nav>
          </div>
        </div>
        <div className={(this.state.showingSearch ? "showing " : "") + "search-container"}>
          <input type="text" value={this.state.txtSearch} onChange={(e) => this.onSearch(e)}/>
          <a href="#" onClick={(e) => this.showSearchContainer(e)}>
            <i className="material-icons close">close</i>
          </a>
          {this.state.searchResults.length > 0 && (
            <ul className="search-result">
              {this.state.searchResults.map(result => (
                <li className="search-result-item" key={result.item._id}>
                  <div className="search-result-item-img"><img src={result.item.picture}/></div>
                  <div>
                    <p><b>{result.item.name}</b></p>
                    <b>Price: </b> {result.item.price}
                    <p>{result.item.about}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>
    );
  }
}

// Export out the React Component
module.exports = Menu;
