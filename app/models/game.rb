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

end
