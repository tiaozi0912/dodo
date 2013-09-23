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
	  $container.html(dayCount());
	}

  return $(this).each(function() {
    $timer = $(this);
    display($timer);

    setInterval(function() {
    	display($timer);
    }, interval); 
  });
}

window.dayCount = function(){
	var now = moment();
	return Math.ceil(now.diff(baseMoment, 'days', true));
}

function scrollSpy() {
	var settings = {
    base: $('.time-container').innerHeight(),
    posts: $('.post-container'),
    timer: $('.timer-container .timer')
	};

	$(window).scroll(function() {
		var scrollTop = $('body').scrollTop();
		if (scrollTop === 0) {
      settings.timer.html(window.dayCount());
		}else {
      var index = getIndex(scrollTop, settings.posts);
	    var spot = settings.posts[index];
	    var dayCount = getDay($(spot));
	    settings.timer.html(dayCount);
		}
	});

	function getIndex(top, posts) {
		var i = 0;
		for(var j=0;posts[j];j++) {
			top -= $(posts[j]).innerHeight();
			if (top < 0) {
				break;
			}
			i += 1;
		}

		return i;
	}

	function getDay($post) {
		return $post.find('b.day-count').html();
	}
}
