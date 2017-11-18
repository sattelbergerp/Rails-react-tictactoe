class RemonePlayer1LastUpdateAndPlayer2LastApdateFromGames < ActiveRecord::Migration
  def change
    remove_column :games, :player1_last_update
    remove_column :games, :player2_last_update
  end
end
