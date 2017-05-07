$(document).ready(function(){
	var items = $('#gallery li'),
		itemsByTags = {};

	//loop through tags
	items.each(function(i){
		var elem=$(this),
			tags=elem.data('tags').split(',');

		//add data attribute for quicksand
		elem.attr('data-id',i);

		$.each(tags, function(key, value){
			//remove whitespace
			value=$.trim(value);

			if (!(value in itemsByTags)) {
				//add empty value
				itemsByTags[value]=[];
			}

			//add image to array
			itemsByTags[value].push(elem)
		});
	});

	//create all items option
	createList('All items',items);
	//create all category items
	$.each(itemsByTags, function(k, v){
		createList(k,v);
	})

	//click handler
	$('#navbar a').on('click', function(e){
		var link = $(this);

		//add active class
		link.addClass('active').siblings().removeClass('active');
		$('#gallery').quicksand(link.data('list').find('li'));
		e.preventDefault()
	});

	$('#navbar a:first').click();

	//create the lists
	function createList(text,items){
		var ul=$('<ul>',{'class':'hidden'});

		$.each(items, function(){
			$(this).clone().appendTo(ul);
		})

		//add gallery div
		ul.appendTo('#gallery');

		//create menu item
		var a = $('<a>',{
			html:text,
			href:'#',
			data:{list:ul}
		}).appendTo('#navbar');
	};
});