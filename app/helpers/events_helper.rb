module EventsHelper
	def text_input(id,attribute,value)
	    "<input name='event[expense][#{id}][#{attribute}]' type='text' value ='#{value}' id='event_expense_#{id}_#{attribute}'>".html_safe
	end
end
