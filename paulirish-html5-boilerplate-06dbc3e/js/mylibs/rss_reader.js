function readFeed( feedIndex ) 
{
	const FOOTBALL_INSIDER_URL = 'http://feeds.washingtonpost.com/rss/rss_football-insider';
	const HOGS_HAVEN_URL = 'http://feeds.feedburner.com/sportsblogs/hogshaven';
	const BOG_URL = 'http://feeds.washingtonpost.com/rss/rss_dc-sports-bog';
	
	const ALL_FEEDS = [ FOOTBALL_INSIDER_URL, HOGS_HAVEN_URL, BOG_URL ];
	
	var url = ALL_FEEDS[ feedIndex ];
	
	$.jGFeed( url, parseFeeds, 5 );
};

/**
 * Takes in an array of feeds, which contain arrays of google feed API entries,
 * and adds their data to the screen
 */
function parseFeeds( feeds )
{
	// Check for errors
	if(!feeds) {
		// there was an error
		return false;
	}
	
	//clear the content in the div for the next feed.
	$("#feedContent").empty();
	
	// do whatever you want with feeds here
	for( var i = 0; i < feeds.entries.length; i++ ) 
	{
		var entry = feeds.entries[i];
		// Entry title
		var title = scrub( entry.title );
		var pubDate = entry.publishedDate;
		//use the snippet length to determine where to place the expander link
		var snippet = scrub( entry.contentSnippet );
		var link = entry.link;
		
		var catArray = entry.categories;
		var catHTML = '<ul>';
		for( var cat = 0; cat < catArray.length; cat++ )
		{
			catHTML += '<li>' + catArray[ cat ] + '</li>'
		}
		catHTML += '</ul>'
		
		var html = "<div class=\"entry\"><h2 class=\"postTitle\">" + title + "<\/h2>";
		html += "<em class=\"date\">" + pubDate + "</em>";
		//html += "<p class=\"description\">" + snippet + "</p>";
		html += catHTML;
		html += "<div class=\"expandable\" id=\"content\">" + scrub( entry.content ) + "</div>";
		html += "<a href=\"" + link + "\" target=\"_blank\">Go to site >><\/a><\/div>";
 
		//put that feed content on the screen!
		$('#feedContent').append($(html));
	}
  	
  	// simple example, using all default options unless overridden globally
	$('div.expandable').expander({
	    slicePoint:       snippet.length,  // default is 100
	    //expandPrefix:     ' ', // default is '... '
	    //expandText:       '[...]', // default is 'read more'
	    //collapseTimer:    5000, // re-collapses after 5 seconds; default is 0, so no re-collapsing
	    //userCollapseText: '[^]'  // default is 'read less'
  	});
}

/**
 * String -> String
 * Takes in a string and returns a copy of it where all instances
 * of "Redskins" have been replaced with "********"
 */
function scrub( toScrub )
{
	return toScrub.replace( "Redskins", "*******" )
}
