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
                    + "]' type='text' class='invisible " + cols[i] + "'></td>";
  }
  tr = "<tr class='table-row table-row-new'>" + td + "</tr>";
  $('tbody').append(tr);
  var $lastInput = $('.table-row-new:last td input:last');
  $lastInput.val('All');
  $lastInput.addEditableContent();
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

function selectParticipants($selector,group){
  $selector.val('');
  $selector.tagPicker(group);
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

function preprocessTable(group){
  loadGroup(group);
  $('.table-row-new input:last').addClass('participant');
  $('.table-row-new input[id*=user]').addClass('payer');
  $('#input-table').addEditableRows();
  //save changes in the editable content to the hidden input
  $('body').on('mouseout','.editable-content',function(){
  //$('body').on('blur','.editable-content',function(){
    saveChangesToInput($(this));
  });
}

$.fn.addEditableRows = function(){
  $table = this;
  $table.find('input').each(function(i,v){
    $(v).addEditableContent();
  })
}

$.fn.addEditableContent = function(){
  var classname = this.attr('class').replace(/ invisible/,'');
  var s = "<span class='editable-content " + classname + "' contenteditable='true'>" + this.val() + "</span>";
  this.after(s);
}

function saveChangesToInput($selector){
  var content = $selector.html();
  $selector.siblings('input').attr('value',content);
}

var dodoIs = function(){
  var arr = ["smart?","ben ben de!","sexyyyyy!","so cute???","cute!!!!!","sha hu hu","pretty!!","dump~","dudududu!","zhu zhu!"];
  var i = parseInt(Math.random() * arr.length);
  i = (i == arr.length ? i - 1 : i);
  return "Dodo is " + arr[i];
}

$.fn.setBackgroundImage = function(link){
  var url = 'url(' + link + ')';
  this.css('background-image',url);
  this.css('background-size','cover');
}


