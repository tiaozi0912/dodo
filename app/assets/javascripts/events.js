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

  var cols = ['name','cost','user','participant'];
  var placeholder = ['e.x. Tickets','e.x. 80','e.x. Mike','e.x. All'];

  $.fn.addEditableContent = function(){
    var s;
    var classname = this.attr('class');
    classname = classname.replace(/invisible/,'').replace(/ /g,'');
    if(this.val() == ''){
      s = "<span class='editable-content gray " + classname + "' contenteditable='true'>" + this.attr('placeholder') + "</span>";
    }else{
      s = "<span class='editable-content " + classname + "' contenteditable='true'>" + this.val() + "</span>";
    }
    this.after(s);
  }

  $.fn.addRow = function(){
    this.click(function(){
      var td,tr,count,group;
      group = $('.tag span').getNames();
      count = - $('.table-row-new').length;
      for(i=0;i<cols.length;i++){
        td += "<td><input id='event_expense_" + count + "_" + cols[i]
                        + "' name='event[expense][" + count + '][' + cols[i] 
                        + "]' type='text' class='invisible " + cols[i] + "' placeholder='" + placeholder[i] + "'></td>";
      }
      tr = "<tr class='table-row table-row-new'>" + td + "</tr>";
      $('tbody').append(tr);
      var $lastInput = $('.table-row-new:last td input:last');
      $lastInput.val('All');
      $('.table-row-new:last input').each(function(i,el){
        console.log($(el));
        $(el).addEditableContent();
      });
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
        var amount = $(this).val();
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
    $('body').on('click','span.editable-content',function(){
      var className = $(this).attr('class').replace(/gray/,'');
      $(this).attr('class',className);
    })
    //save changes in the editable content to the hidden input
    $('body').on('mouseout','.editable-content',function(){
      $(this).saveChangesToInput();
    });
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

})(jQuery)

