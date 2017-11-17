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

    player_index == current_turn
  end

  def do_turn(position)
    if valid_move?(position)
      @game.board[position] = current_tile
      @game.turn = !@game.turn
      winner = getWinner()
      if winner > -1
        @game.board = '         '
        @game.turn = false
        @game.swap_players = !@game.swap_players
        update_score(winner)

      end
      return true
    else
      return false
    end
  end

  def update_score(winner)
    if winner==1
      @game.player1_wins += 1
      @game.player1.wins += 1
    else
      @game.player1.losses += 1
    end

    if winner == 2
      @game.player2_wins += 1
      @game.player2.wins += 1
    else
      @game.player2.losses += 1
    end

    @game.player1.save
    @game.player2.save
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

      if token == player1_tile
        return 1
      elsif token == player2_tile
        return 2
      end
    end
    if board.count {|t| t=="X"||t=="O"} == 9
      return 0;
    end
    return -1;
  end

  def playing
    @game.player1 != nil && @game.player2 != nil
  end

  def current_turn
    if @game.swap_players
      @game.turn ? 1 : 2
    else
      @game.turn ? 2 : 1
    end
  end

  def current_tile
    if current_turn == 1
      player1_tile
    else
      player2_tile
    end
  end

  def player1_tile
    @game.swap_players ? "O" : "X"
  end

  def player2_tile
    @game.swap_players ? "X" : "O"
  end

end
