import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchGames } from './../../actions/gamesActions';
import { joinGame } from './../../actions/gameActions';
import LoadingOverlay from './../../components/LoadingOverlay'

class GamesList extends Component{

  constructor(){
    super();
    this.state = {selected: -1}
  }

  componentDidMount(){
    this.props.fetchGames();
  }

  refresh = (event) => {
    this.props.fetchGames();
  }

  join = (event) => {
    this.props.joinGame(this.state.selected);
    this.props.history.push('/games/'+this.state.selected);
  }

  spectate = (event) => {
    this.props.history.push('/games/'+this.state.selected);
  }

  create = (event) => {
    this.props.history.push('/games/new');
  }

  select = (event, index) => {
    this.setState({selected: index});
  }

  render(){
    let gameList = this.props.games.map((game, index)=>{
    return (<tr className={game.id===this.state.selected? "game-list-seletcted" : ""} onClick={event=>this.select(event, game.id)}>
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
        <div className="game-list-controls">
          <button className="btn btn-default" disabled={this.props.loading} onClick={this.create}>Create Game</button>
          <button className="btn btn-default" disabled={this.props.loading} onClick={this.refresh}>Refresh</button>
          <button className="right btn btn-default" disabled={this.props.loading || this.state.selected === -1} onClick={this.join}>Join Game</button>
          <button className="right btn btn-default" disabled={this.props.loading || this.state.selected === -1} onClick={this.spectate}>Spectate Game</button>
        </div>
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
