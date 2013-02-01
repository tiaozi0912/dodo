// source is the array
(function(){
  var $input;
  $.fn.tagPicker = function(source,options){
    var settings = $.extend({
      perRow : 3
    },options);

    $.fn.attachRow = function(row,col){
      var $selector = this;
      $selector.append("<div class='row-fluid'></div>");
      var checkboxes = '';
      for(j=0;j<col;j++){
        var k = j + row * settings.perRow; 
        checkboxes += "<label class='span4 checkbox'><input type='checkbox' name='" + source[k] + "' id='" + str_safe(source[k]) + "'>" + source[k] + "</label>"
      }
      $('.tag-picker').find('.row-fluid:last').append(checkboxes);
    }

    function str_safe(str){
      return str.replace(/[\s]+/,'_');
    }

    $.fn.attachPicker = function(){
      var $selector = this;
      var id = $selector.attr('id');
      var picker = "<div class='tag-picker' id='" + id + "-tag-picker'><div class='close-picker'>&times;</button></div>";
      $selector.after(picker);
      var rows,count = source.length;
      var res =count % settings.perRow;
      rows = parseInt(count / settings.perRow);
      for(i=0;i<rows;i++){
        $('.tag-picker').attachRow(i,settings.perRow);
      }
      if(res != 0){
        $('.tag-picker').attachRow(rows,res);
      }
      $('.tag-picker').append("<div class='btn btn-success' id='btn-done'>Done</div>");
      //set the td parent position as relative
      $selector.parent().css('position','relative');
      $('.tag-picker').css('top',1.3 * $selector.outerHeight());
    };

    $.fn.preChecked = function(){
      var $selector = this;
      var val = $selector.val();
      if(val == "All"){
        $('.tag-picker input').prop('checked',true);
      }else if(val != ''){
        var names = val.split(',');
        console.log(names);
        for(i=0;i<names.length;i++){
          var s = ".tag-picker #"+str_safe(names[i])+"";
          $(s).prop('checked',true);
        }
      }
      //disable the text input
      $selector.prop('disabled',true);
    }

    if($('.tag-picker').length == 0){ 
      $input = this;
      $input.attachPicker(); 
      $input.preChecked();
    }

  }

  $(document).ready(function(){
    $('body').on('click','.tag-picker .close-picker',function(){
      dismissTagPicker();
    })
    
    $('body').on('click','.tag-picker #btn-done', function(){
      var tags = getTags();
      dismissTagPicker();
      $input.val(tags);     
    });
  });

  function getTags(){
    var t = [];
    $('.tag-picker input').each(function(){
      if($(this).is(':checked')) t.push($(this).attr('name'));
    });
    return t.join(',');
  }

  function dismissTagPicker(){
    $('.tag-picker').remove();
    $input.prop('disabled',false);
  }

})(jQuery);

