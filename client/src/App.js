import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import UserContainer from './containers/user/UserContainer';
import NewGameForm from './containers/game/NewGameForm'
import NavBar from './components/NavBar'
import { connect } from 'react-redux';
import { fetchCurrentUser } from './actions/accountActions'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'

class App extends Component {

  componentDidMount(){
    this.props.fetchCurrentUser();
  }

  render() {
    return (
      <Router>
        <div className="App" id="app">
          <NavBar />
          <Route path="/users" component={UserContainer} />
          <Route path="/games/new" component={NewGameForm} />
        </div>
      </Router>
    );
  }
}

function bindStateToProps(state){
  return {account: state.account}
}


export default connect(bindStateToProps, {fetchCurrentUser})(App);
