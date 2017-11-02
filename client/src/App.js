import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import AccountContainer from './containers/account/AccountContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App" id="app">
        <Router>
          <Route path="/account" component={AccountContainer} />
        </Router>
      </div>
    );
  }
}

export default App;
