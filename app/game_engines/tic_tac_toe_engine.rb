class TicTacToeEngine

  WIN_STATES = ["XXX      ","   XXX   ","      XXX","X  X  X  "," X  X  X ","  X  X  X","X   X   X","  X X X  ",]

  def initialize(game)
    @game = game
  end

  def players_turn? (player)
    player_index = 0
    if player == @game.player1
      player_index = 1
    elsif player == @game.player2
      player_index = 2
    end

    player_index == @game.current_turn
  end

  def do_turn(position)
    if valid_move?(position)
      @game.board[position] = @game.current_tile
      @game.turn = !@game.turn
      winner = getWinner()
      if winner > -1
        @game.board = '         '
        @game.turn = false
        @game.swap_players = !@game.swap_players
        @game.player1_wins += winner==1 ? 1 : 0
        @game.player2_wins += winner==2 ? 1 : 0
      end
      return true
    else
      return false
    end
  end

  def valid_move?(position)
    position >= 0 && position <= 8 && @game.board[position] == " "
  end

  def getWinner
    board = @game.boardArray
    WIN_STATES.each do |state|
      token = nil
      state.chars.each_with_index do |tile, index|
        if tile != " "
          if token == nil
            token = @game.board[index]
          elsif token != @game.board[index]
            token = nil
            break;
          end
        end
      end

      if token == @game.player1_tile
        return 1
      elsif token == @game.player2_tile
        return 2
      end
    end
    if board.count {|t| t=="X"||t=="O"} == 9
      return 0;
    end
    return -1;
  end

end
