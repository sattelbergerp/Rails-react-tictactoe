import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openGame } from './../../actions/gameActions';
import GameBoard from './GameBoard';

class NewGameForm extends Component{

  componentDidMount(){
    if(!this.props.inGame && !this.props.loading){
      this.props.openGame(this.props.match.params.id);
    }
  }

  render(){
    if(this.props.loading || !this.props.inGame) return (<div>Entering game please wait</div>);
    return (<div>
      {this.props.game.name}<br/>
      <GameBoard board={this.props.game.board} />
      </div>);
  }

}

function bindStateToProps(state){
  return {
    loading: state.game.loading,
    inGame: state.game.inGame,
    game: state.game.current
  };
}

export default connect(bindStateToProps, { openGame })(NewGameForm);
