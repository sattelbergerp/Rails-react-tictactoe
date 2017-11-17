import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from './../../actions/usersActions'
import { signOut } from './../../actions/accountActions'


class UserInfoPage extends Component{

  componentDidMount(){
    this.props.fetchUser(this.props.match.params.id);
  }

  handleSignOut = (event) => {
    this.props.signOut();
    this.props.history.goBack();
  }

  handleOnClose = (event) => {
    this.props.history.goBack();
  }

  render(){
    let content = (<div>Loading...</div>);
    if(!this.props.userLoading){
      let accountControls = (<div></div>);
      if(this.props.user.id === this.props.account.user.id){
        accountControls = (<div>
            <button onClick={this.handleSignOut}>Sign Out</button>
          </div>);
      }
      content = (<div>
          Email: {this.props.user.email}<br />
          Wins: {this.props.user.wins}<br />
          Losses: {this.props.user.losses}<br />
          Win Percentage: {this.props.user.win_percent}%<br /><br />
          {accountControls}
        </div>);
    }
    return (<div className="overlay">
      <div id="user-container">
        <h2>
          User
          <button type="button" className="close close-large right" onClick={this.handleOnClose} disabled={this.props.loading}>
            <span aria-hidden="true">&times;</span>
          </button>
        </h2>
        {content}
      </div></div>);
  }

}

function bindStateToProps(state){
  return {
    user: state.users.user,
    account: state.account,
    userLoading: state.users.loading
  };
}

export default connect(bindStateToProps, {fetchUser, signOut})(UserInfoPage);
