class GameSerializer < ActiveModel::Serializer
  attributes :id, :name, :player1_wins, :player2_wins
  attribute :board do
    object.boardArray
  end

  attribute :playing do
    TicTacToeEngine.new(object).playing
  end

  attribute :current_turn do
    TicTacToeEngine.new(object).current_turn
  end

  attribute :player1_tile do
    TicTacToeEngine.new(object).player1_tile
  end

  attribute :player2_tile do
    TicTacToeEngine.new(object).player2_tile
  end

  belongs_to :player1
  belongs_to :player2
end
