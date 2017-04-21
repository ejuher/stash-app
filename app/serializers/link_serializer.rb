class LinkSerializer < ActiveModel::Serializer
  attributes :id, :url, :title, :tag, :created_at
end
