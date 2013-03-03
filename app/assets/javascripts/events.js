(function($){
  var FormValidation = function(){
    this.eventNameValidated = function(name){
      var flag = isEmpty(name);
      //TODO: if flag false, error message
      if(!flag) alert("Event name can't be empty.");
      return flag;
    }
    this.costValidated = function($selecor,amount){
      console.log('The number is: ' + amount);
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

  $.createEvent = function(){
    var name = $('#event_name').val();
    if(fv.eventNameValidated(name)){
      $('form').submit();
    }
  }

  function loadGroup(names){
    var v = names.join(',');
    $('#event_group').val(v);
  }

  $.fn.addEditableContent = function(){
    var classname = this.attr('class');
    classname = classname.replace(/invisible/,'').replace(/ /g,'');
    $editableContent = $("<span class='editable-content' contenteditable='true'></span>");
    var text = (this.val() == '' ?  this.attr('placeholder') : this.val());
    $editableContent.addClass(classname).html(text);
    if(this.val() == ''){
      $editableContent.addClass('gray');
    }
    this.after($editableContent);
  }
  
  

  var cols = ['name','cost','user','participant'];
  var placeholder = ['e.x. Tickets','e.x. 80','e.x. Mike','e.x. All'];

  $.fn.addRow = function(){
    this.click(function(){
      var td='',tr,count,group;
      //group = $('.tag span').getNames();
      count = - $('.table-row-new').length;
      for(var i=0;i<cols.length;i++){
        td += "<td><input id='event_expense_" + count + "_" + cols[i]
                        + "' name='event[expense][" + count + '][' + cols[i] 
                        + "]' type='text' class='invisible " + cols[i] + "' placeholder='" + placeholder[i] + "'></td>";
      }
      tr = "<tr class='table-row table-row-new'>" + td + "</tr>";
      $('#input-table tbody').append(tr);
      var $lastInput = $('.table-row-new:last td input:last');
      $lastInput.val('All');
      $('.table-row-new:last input').each(function(){
        $(this).addEditableContent();
      })
    })
  }

  //exist people will be dynamically changed when calling ajax to add people
  $.addPeopleToEvent = function(existNames,event_id){
    $('body').on('mouseout','#event_group_tagsinput',function(){
      var names = $('#event_group_tagsinput .tag span').getNames();
      //console.log(names);
      var newNames = getNewNames(existNames,names);
      //console.log(newNames);
      //ajax call if newNames is not empty
      if(newNames.length > 0 && newNames[0] != ''){
        newNames.forEach(function(v,i){
          existNames.push(v);
        })
        var url = '/users';
        var data = {'event_id':event_id,'user_names':newNames};
        $.post(url,data,function(response){
          //console.log(response['usernames']);
        },"json");
      }
    })
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

  $.fn.safeVal = function(){
    var str = this.val();
    str = str.replace(/<br>/g,'');
    this.val(str);
  }

  $.fn.saveForm = function(){
    this.click(function(){
      var costIsNumber = true;
      $('.table-row-new td input[id*=cost]').each(function(){
        $(this).safeVal();
        var amount = $(this).attr('value');
        // Will be called multiple times
        if(!fv.costValidated($(this),amount)) costIsNumber = false;
      })
      $('.table-row-new td input[id*=expense]').each(function(){
        $(this).safeVal();
      })
      if(costIsNumber){
        $('form').submit();
      }
    })
  }

  $.preprocessTable = function(group){
    loadGroup(group);
    $('#input-table').addEditableRows();
    editableContentInteractive();
    /*$('body').on('click','span.editable-content',function(){
      var className = $(this).attr('class').replace(/gray/,'');
      $(this).attr('class',className);
    })*/
    //save changes in the editable content to the hidden input
    $('body').on('mouseout','.editable-content',function(){
      $(this).saveChangesToInput();
    });
  }

  //tab in to enter the content, dismiss the placeholder;
  //tab out somewhere else, if nothing entered, show the placeholder;
  function editableContentInteractive(){
    $('body').on('focus','span.editable-content',function(){
      if($(this).attr('class').match(/gray/) && $(this).needEnterText()){ // check if it is in the new row
        $(this).html('&nbsp;');
        //$(this).html('');
        //TODO: remove &nbsp when the user starts to enter text
      }
      $(this).removeClass('gray');
    });
    $('body').on('blur','span.editable-content',function(){
      console.log('blur!');
      var cls = $(this).attr('class');
      var content = $(this).html().replace(/&nbsp;/,'');
      if(!content){ //check if any content was entered by the user
        $(this).addClass('gray');
        var placeholder = $(this).siblings('input').attr('placeholder');
        $(this).html(placeholder);
      }
    })
  }

  $.fn.needEnterText = function(){
    var cls = $(this).attr('class');
    return (cls.match(/name/) || cls.match(/cost/));
  }

  $.fn.addEditableRows = function(){
    $table = this;
    $table.find('input').each(function(i,v){
      $(v).addEditableContent();
    })
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

  $.fn.eventNameWaitForUpdating  = function(){
    var text = $(this).html();
    this.mouseout(function(){
      var curr_text = $(this).html();
      if(curr_text != text){
        var data = {name : curr_text};
        var event_id = $('form.edit_event').attr('id').replace(/edit_event_/,'');
        var url = '/update_event_name/'+ event_id;
        $.post(url,data,function(){
          //update original text
          text = curr_text;
        });
      }  
    })
  }

  $.fn.appendDeleteRowBtn = function(){
    var $deleteBtn = $("<span>x</span>");
    $deleteBtn.addClass('delete-row-btn');
    this.children('td:last').append($deleteBtn);
    $('body').on('click','.delete-row-btn',deleteRow);
  }

  function deleteRow(){
    var $row = $(this).parents('tr');
    //update the database using ajax
    //delete the expense and associated participants
    var expenseID = parseInt($row.find('input.name').attr('id').match(/[0-9]+/));
    var data = {id : expenseID};
    $.post('/expenses/delete',data,function(response){
      if(response.error){
        console.log('error message is: ' + response.error);
      }
    });
    //remove the DOM
    $row.remove();  
  }

  $.fn.removeDeleteRowBtn = function(){
    this.children('td:last').find('.delete-row-btn').remove();
    $('body').off('click','.delete-row-btn',deleteRow);
  }

})(jQuery)

