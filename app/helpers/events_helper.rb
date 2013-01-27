module EventsHelper
	def text_input(id,attribute,*value)
	    @str = "<input name='event[expense][#{id}][#{attribute}]' type='text' id='event_expense_#{id}_#{attribute}'"
	    @str += " value='#{value.first}'" if !value.first.nil?
	    (@str + ">").html_safe
	end
end
