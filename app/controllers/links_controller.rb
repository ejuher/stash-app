class LinksController < ApplicationController
  def index
    if params.dig(:filter, :last_link_id)
      last_link = Link.find(params[:filter][:last_link_id])
      render json: Link.where(archived: false).where('created_at > ?', last_link.created_at)
    else
      render json: Link.where(archived: false).where('created_at > ?', 1.year.ago)
    end
  end

  def create
    @link = Link.new(link_params)
    if @link.save
      render json: @link
    else
      render json: { errors: @link.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @link = Link.find(params[:id])
    @link.update!(link_params)
    render json: @link
  end

  private

  def link_params
    ActiveModelSerializers::Deserialization.jsonapi_parse(params, only: %i(url title tag archived faved))
  end
end
