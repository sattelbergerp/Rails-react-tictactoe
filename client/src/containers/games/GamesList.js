import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchGames } from './../../actions/gamesActions';
import { joinGame } from './../../actions/gameActions';
import LoadingOverlay from './../../components/LoadingOverlay'

class GamesList extends Component{

  componentDidMount(){
    this.props.fetchGames();
  }

  handleOnJoin = (event, gameId) => {
    this.props.joinGame(gameId);
    this.props.history.push('/games/'+gameId);
  }

  render(){
    let gameList = this.props.games.map((game, index)=>{
    return (<tr>
      <td>{game.name}</td>
      <td>{game.player1? game.player1.email : ""}</td>
      <td>{game.player2? game.player2.email : ""}</td>
      </tr>);
    });

    return (<div className="game-list-container">
        <LoadingOverlay show={this.props.loading} bg="true" />
        <table className="table">
          <thead>
            <tr>
             <th scope="col">Game Name</th>
             <th scope="col">Player 1</th>
             <th scope="col">Player 2</th>
           </tr>
          </thead>
          <tbody>
            {gameList}
          </tbody>
        </table>
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
