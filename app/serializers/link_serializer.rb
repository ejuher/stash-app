class LinkSerializer < ActiveModel::Serializer
  attributes :id, :url, :title, :tag, :archived, :faved, :created_at
end
