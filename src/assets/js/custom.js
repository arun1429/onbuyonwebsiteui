jQuery(document).on('click', '.mega-dropdown', function(e) {
	e.stopPropagation()
	
});


jQuery(document).ready(function() {
	jQuery('.mobile-arrow').on('click', function() {
	  jQuery('body').css('overflow-y', 'hidden');
	  jQuery('.menubg').show();
	});

	jQuery('.menubg').click(function() {
		jQuery('body').css('overflow-y', 'visible');
		jQuery('.navbar-collapse').removeClass('show');
		jQuery('.menubg').hide();
	  });

	  jQuery('.title-submenu').on('click', function() {
		jQuery('body').css('overflow-y', 'hidden');
		jQuery('.menubg').show();
		jQuery(this).next(".subdrop3").toggle();
	  });

	  jQuery('.hdprofile').on('click', function() {

		jQuery(this).next(".logpopup").toggle();
	  });
	  
  });