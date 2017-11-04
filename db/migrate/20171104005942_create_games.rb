class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :name, default: 'Game'
      t.integer :player1_id
      t.integer :player2_id
      t.integer :player1_wins, default: 0
      t.integer :player2_wins, default: 0
      t.boolean :turn, default: false
      t.boolean :swap_players, default: false
      t.timestamp :player1_last_update, default: 0
      t.timestamp :player2_last_update, default: 0
      t.string :board, default: '         '

      t.timestamps null: false
    end
  end
end
