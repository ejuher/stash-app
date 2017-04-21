class LinksController < ApplicationController
  def index
    render json: Link.all
  end

  def show
  end

  def create
    @link = Link.new(link_params)
    if @link.save
      render json: @link
    else
      render json: { errors: @link.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
  end

  private

  def link_params
    ActiveModelSerializers::Deserialization.jsonapi_parse(params, only: %i(url title tag))
  end
end
