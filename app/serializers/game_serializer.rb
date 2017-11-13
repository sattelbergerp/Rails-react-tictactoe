class GameSerializer < ActiveModel::Serializer
  attributes :id, :name, :player1_wins, :player2_wins, :playing, :current_turn, :player1_tile, :player2_tile
  attribute :board do
    object.boardArray
  end


  attribute :player1_last_update do
    object.player1_last_update.to_i
  end

  attribute :player2_last_update do
    object.player2_last_update.to_i
  end

  belongs_to :player1
  belongs_to :player2
end
