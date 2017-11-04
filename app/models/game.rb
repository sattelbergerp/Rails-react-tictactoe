class Game < ActiveRecord::Base

  belongs_to :player1, class_name: :User
  belongs_to :player2, class_name: :User

  def boardArray
    board.chars
  end

  def boardArray=(board)
    self.board = board.join("")
  end

  def playing
    player1 != nil && player2 != nil
  end

  def current_turn
    if swap_players
      turn ? 1 : 2
    else
      turn ? 2 : 1
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
    swap_players ? "O" : "X"
  end

  def player2_tile
    swap_players ? "X" : "O"
  end

end
