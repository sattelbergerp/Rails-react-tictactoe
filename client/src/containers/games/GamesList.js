import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchGames } from './../../actions/gamesActions';
import { joinGame } from './../../actions/gameActions';

class GamesList extends Component{

  componentDidMount(){
    this.props.fetchGames();
  }

  handleOnJoin = (event, gameId) => {
    this.props.joinGame(gameId);
    this.props.history.push('/games/'+gameId);
  }

  render(){
    return (<div>
        <p>Is loading games list: {this.props.loading? "yes" : "no"}</p>
        <ul>{this.props.games.map((game, index)=>{
          return (<li>
            Name: {game.name}, Started: {game.playing? "Yes" : "No"},
            <Link to={'/games/'+game.id}>[Spectate]</Link>,
            <a href="javascript:void(0)" onClick={event=>this.handleOnJoin(event, game.id)}>[Play]</a>
            </li>);
        })}</ul>
      </div>);
  }

}

function bindStateToProps(state){
  return {
    loading: state.games.loading,
    games: state.games.list,
    errors: state.games.errors
  };
}

export default connect(bindStateToProps, { fetchGames, joinGame })(GamesList);
