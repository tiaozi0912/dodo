var FormValidation = function(){
  this.eventNameValidated = function(name){
    var flag = isEmpty(name);
    //TODO: if flag false, error message
    if(!flag) alert("Event name can't be empty.");
    return flag;
  }
  this.costValidated = function($selecor,amount){
    if(!isNumber(amount)) alert('Please enter number in the cost.');
    return isNumber(amount);
  }
}

function isNumber(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function isEmpty(str){
  return str.length > 0;
}

var fv = new FormValidation();

function createEvent(){
  var name = $('#event_name').val();
	if(fv.eventNameValidated(name)){
	  $('form').submit();
	}
}

function loadGroup(names){
  var v = names.join(',');
  $('#event_group').val(v);
}

var cols = ['name','cost','user','participant'];
function addRow(){
  var td,tr,count,group;
  group = $('.tag span').getNames();
  count = - $('.table-row-new').length;
  for(i=0;i<cols.length;i++){
    td += "<td><input id='event_expense_" + count + "_" + cols[i]
                    + "' name='event[expense][" + count + '][' + cols[i] 
                    + "]' type='text'></td>";
  }
  tr = "<tr class='table-row table-row-new'>" + td + "</tr>";
  $('tbody').append(tr);
  var $lastTd = $('.table-row-new:last td input:last');
  $lastTd.val('All');
  $lastTd.addClass('participant');
  $('.table-row-new:last td input[id*=user]').addClass('payer');
}

//exist people will be dynamically changed when calling ajax to add people
function addPeopleToEvent(existNames,event_id){
  var names = $('#event_group_tagsinput .tag span').getNames();
  var newNames = getNewNames(existNames,names);
  //ajax call if newNames is not empty
  if(newNames.length > 0){
    var url = '/users';
    var data = {'event_id':event_id,'user_names':newNames};
    $.post(url,data,function(response){
      //console.log(response['usernames']);
    },"json");
  }
  return names;
}

$.fn.getNames = function(){
  var names = [];
  this.each(function(){
    var name = $(this).html().replace(/&nbsp;&nbsp;/,'');
    names.push(name);
  })
  return names;
}

function getNewNames(existNames,names){
  var hashTable = {};
  var newNames = [];
  for(i=0;i<existNames.length;i++) hashTable[existNames[i]] = 0;
  for(j=0;j<names.length;j++){
    if(!hashTable.hasOwnProperty(names[j])) newNames.push(names[j]);
  }
  return newNames;
}

function autoCompleteSource(group){
  return group;
}

//TODO: only enable people to select from suggestion
function pickIncludedPeople($selector,group){
  $selector.val('');
  $selector.tagsInput({
    'autocomplete_url': group,
    'defaultText':'add a person'
  })
}

function saveForm(){
  var costIsNumber = true;
  $('.table-row-new td input[id*=cost]').each(function(){
    var amount = $(this).val();
    if(!fv.costValidated($(this),amount)) costIsNumber = false;
  })
  if(costIsNumber){
    $('form').submit();
  }
}

function preprocessTable(){
  $('.table-row-new input:last').addClass('participant');
  $('.table-row-new input[id*=user]').addClass('payer');
}


