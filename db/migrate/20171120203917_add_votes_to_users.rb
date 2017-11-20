class AddVotesToUsers < ActiveRecord::Migration
  def change
    add_column :users, :votes, :integer, default: 0
  end
end
