class LinkSerializer < ActiveModel::Serializer
  attributes :id, :url, :title, :author, :created_at
end
