class Game < ActiveRecord::Base

  belongs_to :player1, class_name: :User
  belongs_to :player2, class_name: :User
  has_many :messages

  validates :name, length: {maximum: 36}, presence: true

  def self.most_recent()
    order(created_at: :desc)
  end

  def boardArray
    board.chars
  end

  def boardArray=(board)
    self.board = board.join("")
  end

end
