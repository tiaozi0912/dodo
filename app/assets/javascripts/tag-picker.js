// source is the array
(function($){
  var $input;
  $.fn.tagPicker = function(source,options){
    var settings = $.extend({
      perRow : 3,
      type : 'checkbox'
    },options);

    $.fn.attachRow = function(row,col){
      var $selector = this;
      $selector.append("<div class='row-fluid'></div>");
      var checkboxes = '';
      for(j=0;j<col;j++){
        var k = j + row * settings.perRow; 
        checkboxes += "<label class='span4 " + settings.type + "'><input type='" + settings.type + "' name='tags' id='" + str_safe(source[k]) + "'>" + "<span>" + source[k] + "</span></label>"
      }
      $('.tag-picker').find('.row-fluid:last').append(checkboxes);
    }

    $.fn.attachPicker = function(){
      var $selector = this;
      var id = $selector.siblings('input').attr('id');
      $picker = $("<div class='tag-picker'><div class='close-picker'>&times;</div></div>");
      $picker.attr('id',id);
      $selector.after($picker);
      var rows,count = source.length;
      var res =count % settings.perRow;
      rows = parseInt(count / settings.perRow);
      for(i=0;i<rows;i++){
        $('.tag-picker').attachRow(i,settings.perRow);
      }
      if(res != 0){
        $('.tag-picker').attachRow(rows,res);
      }
      $('.tag-picker').append("<div class='btn pull-right' id='btn-done'>Done</div>");
      //set the td parent position as relative
      $selector.parent().css('position','relative');
      $('.tag-picker').css('top',2 * $selector.outerHeight());
    };

    $.fn.preChecked = function(){
      var $selector = this;
      var val = str_safe($selector.html());
      if(val == "All"){
        $('.tag-picker input').prop('checked',true);
      }else if(val != ''){
        var names = val.split(',');
        for(i=0;i<names.length;i++){
          var s = ".tag-picker #"+str_safe(names[i]);
          $(s).prop('checked',true);
        }
      }
      //disable the text input
      $selector.attr('contenteditable',false);
    }

    if($('.tag-picker').length == 0){ 
      $input = this;
      $input.attachPicker(); 
      $input.preChecked();
    }

  }

  function str_safe(str){
    return str.replace(/&nbsp;/g,'')
        .replace(/<br>/g,'')
        .replace(/[\s]+/g, '_');
  }

  $.fn.saveChangesToInput = function(){
    var content = str_safe(this.html());
    if(content){
      this.siblings('input').attr('value',content);
    }
  }

  $(document).ready(function(){
    $('body').on('click','.tag-picker .close-picker',function(){
      dismissTagPicker();
    })
    
    $('body').on('click','.tag-picker #btn-done', function(){
      var tags = getTags();
      $input.html(tags);   
      $input.saveChangesToInput(); 
      dismissTagPicker();
    });
  });

  function getTags(){
    var t = [];
    var n = $('.tag-picker input').length;
    $('.tag-picker input').each(function(){
      if($(this).is(':checked')) t.push(str_safe($(this).siblings('span').html()));
    });
    return (t.length == n ? 'All' : t.join(','));
  }

  function dismissTagPicker(){
    $('.tag-picker').remove();
    $input.prop('disabled',false);
  }

})(jQuery);

