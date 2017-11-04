class GameSerializer < ActiveModel::Serializer
  attributes :id, :name, :player1_wins, :player2_wins, :playing
  attribute :board do
    object.boardArray
  end
#
  attribute :current_turn do
    if object.swap_players
      object.turn ? "1" : "2"
    else
      object.turn ? "2" : "1"
    end
  end

  attribute :player1_tile do
    object.swap_players ? "O" : "X"
  end

  attribute :player2_tile do
    object.swap_players ? "X" : "O"
  end

  attribute :player1_last_update do
    object.player1_last_update.to_i
  end

  attribute :player2_last_update do
    object.player2_last_update.to_i
  end

  attribute :timestamp do
    Time.now.to_i
  end

  belongs_to :player1
  belongs_to :player2
end
