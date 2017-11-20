import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UsersListItem extends Component{

  constructor(){
    super();
    this.state = {votes: 0};
  }

  vote = (event) => {
    this.setState({votes: this.state.votes+1})
  }

  render(){
    return <tr>
      <td><Link to={"/users/"+this.props.user.id} >{this.props.user.display_name}</Link></td>
      <td>{this.props.user.wins}</td>
      <td>{this.props.user.losses}</td>
      <td>
        {this.props.user.win_percent}%, Votes: {this.state.votes}
        <button onClick={this.vote} >Vote</button>
      </td>
    </tr>
  }

}

export default UsersListItem;
