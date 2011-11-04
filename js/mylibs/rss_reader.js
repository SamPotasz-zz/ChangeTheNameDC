const REPLACING_WITH = "*******";

function readFeed( feedIndex ) 
{
	const FOOTBALL_INSIDER = 'http://feeds.washingtonpost.com/rss/rss_football-insider';
	const HOGS_HAVEN = 'http://feeds.feedburner.com/sportsblogs/hogshaven';
	const SPORTS_BOG = 'http://feeds.washingtonpost.com/rss/rss_dc-sports-bog';
	const HARD_HITS = 'http://feeds.washingtonpost.com/rss/rss_hard-hits';
	
	const ALL_FEEDS = [ FOOTBALL_INSIDER, HOGS_HAVEN, SPORTS_BOG, HARD_HITS ];
	
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
		var title = entry.title.replace( "Redskins", REPLACING_WITH )  //scrub( entry.title );
		var pubDate = entry.publishedDate;
		//use the snippet length to determine where to place the expander link
		var snippet = scrub( entry.contentSnippet );
		var content = scrub( entry.content )
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
		html += "<div class=\"expandable\" id=\"content\">" + content + "</div>";
		html += "<a href=\"" + link + "\" target=\"_blank\">Go to site >><\/a><\/div>";
 
		//put that feed content on the screen!
		$('#feedContent').append($(html));
	}
  	
  	// simple example, using all default options unless overridden globally
/*	$('div.expandable').expander({
	    slicePoint:       snippet.length,  // default is 100
	    //expandPrefix:     ' ', // default is '... '
	    //expandText:       '[...]', // default is 'read more'
	    //collapseTimer:    5000, // re-collapses after 5 seconds; default is 0, so no re-collapsing
	    //userCollapseText: '[^]'  // default is 'read less'
	    // beforeExpand: function() {
      		// $('div.expandable').replace("Redskins", "*******")
    },
  	});*/
}

/**
 * String -> String
 * Takes in a string and returns a copy of it where all instances
 * of "Redskins" have been replaced with "********"
 */
function scrub( toScrub )
{
	var clean = toScrub.replace( "Redskins", REPLACING_WITH );
	
	if( toScrub.childNodes )
	{
		clean.childNodes = new Array();
		for( var i = 0; i < toScrub.childNodes.length; i++ )
		{
			alert( "Scrubbing a child " + toScrub.childNodes[ i ] )
			clean.childNodes[ i ] = scrub( toScrub.childNodes[ i ])
		}
		
	}
	return clean;
}
