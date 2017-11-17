import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class NavBar extends Component {

  render() {
    let accountLinks = (<ul className="nav navbar-nav navbar-right">
      <li><a><div className="mini-loader"><div /><div /><div /></div></a></li>
    </ul>);

    if(!this.props.account.loading){
      accountLinks = (<ul className="nav navbar-nav navbar-right">
        <li><NavLink to="/users/sign_in">Sign In <span className="sr-only"></span></NavLink></li>
        <li><NavLink to="/users/sign_up">Sign Up <span className="sr-only"></span></NavLink></li>
      </ul>);
    }

    if(this.props.account.loggedIn){
      accountLinks = (<ul className="nav navbar-nav navbar-right">
        <li><NavLink to={"/users/"+this.props.account.user.id}>My Account <span className="sr-only"></span></NavLink></li>
      </ul>);
    }

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <NavLink className="navbar-brand" to="/">TicTacToe</NavLink>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><NavLink to="/">Games<span className="sr-only"></span></NavLink></li>
              <li><NavLink to="/users">Players<span className="sr-only"></span></NavLink></li>
              <li><NavLink to="/about">About<span className="sr-only"></span></NavLink></li>
            </ul>
            {accountLinks}
          </div>
        </div>
      </nav>
    );
  }
}

function bindStateToProps(state){
  return {
    account: state.account,
  };
}

export default connect(bindStateToProps)(NavBar);
