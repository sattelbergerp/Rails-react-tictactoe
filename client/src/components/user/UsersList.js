import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUsers } from './../../actions/usersActions';

class UsersList extends Component{

  componentDidMount(){
    this.props.fetchUsers(0, true);
  }

  loadMore = ()=>{
    this.props.fetchUsers(this.props.users.length);
  }

  render(){
    let hasMore = (this.props.users.length < this.props.count);
    let footer = (<div></div>);

    if(this.props.loading)
      footer = (<div className="mini-loader"><div /><div /><div /></div>);
    else if(hasMore)
      footer = (<a onClick={this.loadMore} >Load More</a>)
    else
      footer = "End of Content"

    return (<div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Wins</th>
            <th scope="col">Losses</th>
            <th scope="col">Win Percentage</th>
          </tr>
        </thead>
        <tbody>
          {this.props.users.map((user, index)=>{
            return <tr key={index}>
              <td><Link to={"/users/"+user.id} >{user.display_name}</Link></td>
              <td>{user.wins}</td>
              <td>{user.losses}</td>
              <td>{user.win_percent}%</td>
            </tr>
          })}
        </tbody>
      </table>
      <div className="users-list-footer">{footer}</div>
    </div>)
  }

}

function bindStateToProps(state){
  return {
    users: state.users.users,
    loading: state.users.loading,
    pageSize: state.users.users_page_size,
    count: state.users.users_count
  };
}

export default connect(bindStateToProps, { fetchUsers })(UsersList);
