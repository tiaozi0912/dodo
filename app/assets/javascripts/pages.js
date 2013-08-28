function drawDivider() {
	$('.post-container').each(function() {
    var $container = $(this);
    var divider = $(this).find('.divider');
    var h = $container.innerHeight();
    
    divider.height(h);
	});
}

var baseDay = "2013-08-03 12:00:00 -0700";
var baseMoment = moment(baseDay);

setTimeout(function() {
  var now = moment();
  var diff = now.diff(baseMoment, 'days');

  $('.days-container .days').html(diff);
}, 60 * 1000);