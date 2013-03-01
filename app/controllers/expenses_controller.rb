class ExpensesController < ApplicationController
	def destroy
		expense = Expense.find(params[:id])
		if !expense.nil?
      expense.destroy
      render :json => {:success => 'expense is deleted successfully'}
    else
      render :json => {:error => "expense can't be found."}
    end
	end
end
