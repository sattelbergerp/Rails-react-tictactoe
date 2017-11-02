import React, { Component } from 'react';

class UserContainer extends Component{

  render(){
    return (<div id="user-container">
        <h2>Sign In</h2>
        <form>
          <div className="form-group">
            <label>Email: </label>
            <input type="text" className="form-control"/>
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input type="password" className="form-control"/>
          </div>
          <button type="submit" >Sign In</button>
        </form>
      </div>);
  }

}

export default UserContainer;
