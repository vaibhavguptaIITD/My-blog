var movies = null;
function initMovieAppPage()
{
	$("#showMovieInfo").click(function()
	{
		var movieName = $("#movieName").val();
		$.getJSON("http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=2ccpkr3dpkjr4jpyh2ajnwxm&q="+movieName+"&page_limit=5&callback=?",
		function(data)
		{
			console.log(data);
			movies = data.movies;
			if(movies.length)
			{
				var movieTemplateData = getMovieTemplateData();
				$("#movieInfo").html($("#movie_template").tmpl(movieTemplateData));					
			}
		});
	});
	
	$(".movieIndex").live("click", function()
	{
		var othis = $(this);
		if(othis.attr("checked"))
		{	
			postMovieOnFacebook(movies,parseInt(othis.val()));
		}
	});

}

function getMovieTemplateData()
{
	var movieTemplateData = $.map(movies, function(val, i)
			{
				var templateData = {
					index: i,
					image: val.posters.thumbnail,
					movieTitle: val.title,
					description: val.synopsis
				};
				return templateData;
			
			});
	return movieTemplateData;

}

function postMovieOnFacebook(movies, index)
{
	var movie = movies[index],
	postTitle = "I have watched " + movie.title,
	description = movie.synopsis,
	link = movie.links.alternate,
	picture=movie.posters.thumbnail;
	FB.api('/me/feed', 'post', { 'link': link, 'name':movie.title,'picture':picture,message:postTitle,type:'link', "description":description }, function(response) {
	  if (!response || response.error) {
		alert('Error occured');
	  } else {
		alert('Post ID: ' + response.id);
	  }
	});	

}

  