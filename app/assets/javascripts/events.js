function createEvent(){
	if(eventNameValidated()){
	  $('form').submit();
	}
}

function eventNameValidated(){
  var name = $('#event_name').val();
  var flag = ( name.length > 1 );
  // if flag false, error message
  if(!flag) alert("Event name can't be empty.");
  return flag;
}

var cols = ['expense','cost','paid_by','people_included'];
function addRow(){
  var td,tr,count;
  count = $('.table-row').length;
  for(i=0;i<cols.length;i++){
    td += "<td><input id='event_" + cols[i] + '_' + count
                    + "' name='event[" +  cols[i] + '_' + count
                    + "]' type='text'></td>";
  }
  tr = "<tr class='table-row'>" + td + "</tr>";
  $('tbody').append(tr);
}

var group = ['Yujun Wu','Dodo','Yuki','John'];
function autoCompleteSource(){
  return group;
}
