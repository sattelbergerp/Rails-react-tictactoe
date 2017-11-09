import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserContainer from './containers/user/UserContainer';
import NewGameForm from './components/game/NewGameForm'
import GameWindow from './containers/game/GameWindow'
import GamesList from './containers/games/GamesList'
import NavBar from './components/NavBar'
import { connect } from 'react-redux';
import { fetchCurrentUser } from './actions/accountActions'
import { startHeartbeat } from './actions/gameActions'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'

class App extends Component {

  componentDidMount(){
    this.props.fetchCurrentUser();
    this.props.startHeartbeat();
  }

  render() {
    return (
      <Router>
        <div className="App" id="app">
          <NavBar />
          <Route path="/" component={GamesList} />
          <Route path="/users" component={UserContainer} />
          <Switch>
            <Route path="/games/new" component={NewGameForm} />
            <Route path="/games/:id" component={GameWindow} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function bindStateToProps(state){
  return {account: state.account}
}


export default connect(bindStateToProps, {fetchCurrentUser, startHeartbeat})(App);
