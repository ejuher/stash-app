class LinkSerializer < ActiveModel::Serializer
  attributes :id, :url, :title, :tag, :archived, :created_at
end
