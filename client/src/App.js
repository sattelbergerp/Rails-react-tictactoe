import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import UserContainer from './containers/user/UserContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App" id="app">
        <Router>
          <Route path="/account" component={UserContainer} />
        </Router>
      </div>
    );
  }
}

export default App;
