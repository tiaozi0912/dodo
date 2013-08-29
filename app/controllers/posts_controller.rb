class PostsController < ApplicationController
	def new
		@page_header = "New post"
		@button = "create"
    @post = Post.new
	end

	def edit
		@page_header = "Edit post"
		@button = "save"
    @post = Post.find_by_id params[:id]
    render "new"
	end

	def create
		@post = Post.create params[:post]
		flash[:"alert-success"] = "post was created"
		redirect_to root_path
	end

	def update
		@post = Post.find_by_id params[:id]
		@post.update_attributes params[:post]
		flash[:"alert-success"] = "post was updated"
		redirect_to root_path
	end

	def delete
		@post = Post.find_by_id params[:id]
		@post.destroy
		flash[:"alert-success"] = "post was deleted"
		redirect_to root_path
	end
end
