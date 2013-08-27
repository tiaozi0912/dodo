function drawDivider() {
	$('.post-container').each(function() {
    var $container = $(this);
    var divider = $(this).find('.divider');
    var h = $container.innerHeight();
    
    divider.height(h);
	});
}