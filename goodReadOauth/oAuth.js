var express = require('express'),
app = express.createServer(),
OAuth = require('oauth').OAuth,
oa = new OAuth("http://www.goodreads.com/oauth/request_token",
                 "https://www.goodreads.com/oauth/access_token", 
                 "oknFJw1kmk5OVfmp0rwgyw", "v2p5niJhtsh4sPWyIL9tcJBlWZUNxUBxJR6MSxYWE", 
                 "1.0A", "http://localhost:3000/oauth/callback", "HMAC-SHA1"),
oauthObj = null,
xml2js = require('xml2js'),
http = require("http"),
fs = require("fs"),
_ = require("underscore");

app.get("/", function(req,res){
	oa.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
	  if (error) new Error(error.data);
	  else {
	  		if(! oauthObj)
	  			oauthObj = {};
		    oauthObj.token =  oauth_token;
		    oauthObj.token_secret =  oauth_token_secret;
		    res.redirect('http://www.goodreads.com/oauth/authorize?oauth_callback=http://localhost:3000/oauth/callback&oauth_token='+oauth_token);
	    }
	    
	   });
});




app.get('/oauth/callback', function(req, res, next){
  if (oauthObj) {
    oauthObj.verifier = req.query.oauth_verifier;
    var oauth = oauthObj;
    oa.getOAuthAccessToken(oauth.token,oauth.token_secret,oauth.verifier, 
      function(error, oauth_access_token, oauth_access_token_secret, results){
        if (error) new Error(error);
        oauthObj.oauth_access_token = oauth_access_token;
      	oauthObj.oauth_access_token_secret = oauth_access_token_secret;
      	res.redirect("/oauth/getUserId");        	
		});
    }
 else
  next(new Error('No OAuth information stored in the session. How did you get here?'))
});

app.get("/oauth/getUserId", function(req, res, next){
	oa.get("http://www.goodreads.com/api/auth_user ", oauthObj.oauth_access_token, oauthObj.oauth_access_token_secret, function(error, data) {
        	var userId = data.toString().match(/<user id.*>/)[0].split("\"")[1];
        	oauthObj.userId = userId;
        	res.send(userId);

		});
});

app.get("/oauth/readBooks", function(req, res, next)
		{
			console.log("oauthObj.userId " + oauthObj.userId);
			console.log("oauthObj.oauth_access_token, oauthObj.oauth_access_token_secret " + oauthObj.oauth_access_token + " " + oauthObj.oauth_access_token_secret);
			oa.get("http://www.goodreads.com/review/list?format=xml&shelf=read&v=2&id="+oauthObj.userId+"key=oknFJw1kmk5OVfmp0rwgyw", oauthObj.oauth_access_token, oauthObj.oauth_access_token_secret, 
					function(error,data)
					{
						if(error)
							console.log(error);
						else
						{
							var parser = new xml2js.Parser();
							parser.parseString(data, function (err, result) {
						        console.log(result);
						        console.log(JSON.stringify(result));
						        
						    });
							res.send(data);
						}
					}
				)

		}

	);

app.get("/readBooksJson", function(req, res, next)
		{
			var options = {
			    host: 'www.goodreads.com',
			    path: '/review/list?v=2&key=oknFJw1kmk5OVfmp0rwgyw&id=10567634&shelf=read&sort=date_read&per_page=100&order=a'
			};

			http.get(options, function (http_res) {
			    // initialize the container for our data
			    var data = "";

			    // this event fires many times, each time collecting another piece of the response
			    http_res.on("data", function (chunk) {
			        // append this chunk to our growing `data` var
			        data += chunk;
			    });

			    // this event fires *one* time, after all the `data` events/chunks have been gathered
			    http_res.on("end", function () {
			        var parser = new xml2js.Parser();
					parser.parseString(data, function (err, result) {
						var reviews = result.reviews.review,
						date = _.map(reviews, function(review){

										var startedDate = null,
										headline = review.book.title,
										text="<p>"+review.book.title+"</p><p>"+review.book.authors.author.name+"</p>",
										asset = {
											"media":review.book.image_url,
											"credit":"",
											"caption":""
										};
										if(! _.isEmpty(review.started_at))
											startedDate = review.started_at;
										else if(! _.isEmpty(review.read_at))
											startedDate = review.read_at;
										else
											startedDate = review.date_added;
										var date = new Date(Date.parse(startedDate)),
										startedDate = date.getFullYear()+","+(date.getMonth() + 1)+","+date.getDate();
										return {
											"startDate":startedDate,
							                "headline":headline,
							                "text":text,
							                "asset":asset
							               };
									

								});
						timelineObject = {
											"timeline":
										    {
										        "headline":"My Books timeline",
										        "type":"default",
												"startDate":"2011,9,1",
												"text":"The books I have read.",
												"date":date
										    }
										};

						fs.writeFile("readList.json",JSON.stringify(timelineObject), function(err)
								{
									if(err)
										console.log(err);
									else
										console.log("DONE");

								}
							);
				    });
			    });
			});


		}

	);

app.listen(3000);

