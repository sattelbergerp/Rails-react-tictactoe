import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import UserContainer from './containers/user/UserContainer';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'

class App extends Component {
  render() {
    return (
      <div className="App" id="app">
        <Router>
          <Route path="/users" component={UserContainer} />
        </Router>
      </div>
    );
  }
}

export default App;
