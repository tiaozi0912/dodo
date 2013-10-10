class Post < ActiveRecord::Base
  attr_accessible :title, :body, :emotion, :photo, :date

  has_attached_file :photo,
                      :styles => { :thumbnail => "50x50#",
                                     :small => "100x100#",
                                     :medium => "200x200#",
                                     :large => "400x400#" },
                      :storage => :s3,
                      :s3_credentials => S3_CREDENTIALS,
                      :url=>"/created_at_:created_at/:style.jpg",
                      :path => '/app/public/:url'

  Paperclip.interpolates :created_at do |attachment, style|
    attachment.instance.created_at
  end

  def self.emotions_map
  	{
  		"sad" => "rgb(128, 128, 128)", #gray
  		"very sad" => "#323232", #black
  		"happy"=> "#62c462", #green
  		"very happy" => "rgb(250, 0, 0)", #red
  		"nothing" => "rgb(0, 0, 250)", #blue
  	}
  end

  def self.emotions
    arr = []
    emotions_map.each {|k, v| arr << k}
    return arr
  end

  def has_photo?
    !photo.url.include?('missing')
  end

  def info
    {
      :body => body,
      :title => title,
      :thumbnail => photo.url(:medium),
      :created_at => created_at
    }
  end

  def self.base_day
    Time.parse("2013-08-03 23:59:59 -0700")
  end

end
