function drawDivider() {
	$('.post-container').each(function() {
    var $container = $(this);
    var divider = $(this).find('.divider');
    var h = $container.innerHeight();
    
    divider.height(h);
	});
}

window.baseDay = "2013-08-03 23:59:59 -0700";
window.baseMoment = moment(baseDay);

$.fn.timer = function() {
  var interval = 60 * 1000; // per min

	function display($container) {
    var now = moment();
	  var diff = now.diff(baseMoment, 'days');

	  $container.html(diff);
	}

  return $(this).each(function() {
    $timer = $(this);
    display($timer);

    setTimeInterval(function() {
    	display($timer);
    }, inverval); 
  });
}