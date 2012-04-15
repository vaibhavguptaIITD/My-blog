var jsdom = require("jsdom");
var fs = require('fs');
jsdom.env("http://www.amazon.com/registry/wishlist/31FKWY8ND87JA/ref=cm_wl_sb_o?reveal=unpurchased&filter=all&sort=date-added&layout=compact&x=11&y=8", [
  'http://code.jquery.com/jquery-1.5.min.js'
],
function(errors, window) {
	var $ = window.$,
	
	bookTitles = $("tbody.itemWrapper span.productTitle a"),
	authorTitles = $("tbody.itemWrapper span.productTitle ~ span.tiny");
	var log = fs.createWriteStream('book.txt', {'flags': 'a'});
	$.each(bookTitles, function(i, elem)
	{
		var bookName = $(elem).html();
		bookName = bookName.split("[")[0];
		bookName = bookName.split("(")[0];
		log.write($.trim(bookName) + "\n");
	});
	$.each(authorTitles, function(i, elem)
	{
		var authorNames = $(elem).html(),
		authorNames = authorNames.split(",");
		for(var i = 0, len = authorNames.length; i < len; i++)
		{
			var authorName = authorNames[i];
			if(authorName.indexOf("by") != -1)
			{
				authorName = authorName.substring(3);
				authorName = authorName.split("(")[0];
			}
			log.write($.trim(authorName) + "\n");
		}
	});

});
