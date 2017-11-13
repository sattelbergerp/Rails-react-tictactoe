class MessageSerializer < ActiveModel::Serializer
  attributes :id, :contents

  belongs_to :user
end
