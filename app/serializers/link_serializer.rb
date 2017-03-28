class LinkSerializer < ActiveModel::Serializer
  attributes :id, :url, :title, :author
end
