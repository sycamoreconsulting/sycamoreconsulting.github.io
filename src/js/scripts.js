$(document).ready(function() {
	$(function() {
		$('a[href*=#]:not([href=#])').click(function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html,body').animate({
						scrollTop: target.offset().top
					}, 1000);
					return false;
				}
			}
		});
	});

	loadStyles();
});


function loadStyles() {
	var cb = function() {
		var l = document.createElement('link'); l.rel = 'stylesheet';
		l.href = '/assets/css/styles.min.css';
		var h = document.getElementsByTagName('head')[0]; h.parentNode.insertBefore(l,h);
	};
	var raf = requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame;
	if (raf) raf(cb);
	else window.addEventListener('load', cb);
}