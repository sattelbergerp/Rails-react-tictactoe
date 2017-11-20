class UserSerializer < ActiveModel::Serializer
  attributes :id, :wins, :losses, :display_name, :username, :votes

  attribute :win_percent do
    if object.wins==0
      0
    else
      (object.wins.to_f/(object.wins+object.losses)*100).to_i
    end
  end
end
