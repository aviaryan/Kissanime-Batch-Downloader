// python -m http.server
// http://localhost:8000/kissanime.js

var URL = window.location.origin

var episodeLinks = $('table.listing a').map(function(i,el) { return $(el).attr('href'); });

$.ajaxSetup({async:false});
$.getScript("http://kissanime.com/Scripts/asp.js");


var startEpisode;
do {
	startEpisode = prompt("Enter episode number you want to start from", defaultText="1");
	if(startEpisode <= 0 || startEpisode > episodeLinks.length) {
		alert("Episode number entered must be greater than 0 and lesser than total number of eps"); 
	} else {
		break; 
	}
} while(true); 

var endEpisode; 
do {
	endEpisode = prompt("Enter episode number you want to end at", defaultText="2");
	if(endEpisode <= 0 || endEpisode > episodeLinks.length || endEpisode < startEpisode) {
		alert("Episode number entered must be greater than 0 and lesser than total number of eps");
	} else {
		break;
	}
} while(true);

var videoQuality = prompt(
	"Enter video quality you want to download. Example - '960x720.mp4' (without the quotes)", 
	defaultText="854x480.mp4"
);

var i;
for (i = (episodeLinks.length - startEpisode); i >= (episodeLinks.length - endEpisode); i--) {
	jQuery.ajax({
         url:    URL + episodeLinks[i], 
         success: function(result) {
                    var $result = eval($(result));
					
					// console.log(result.search("Save link as"));
					// console.log(result.search("divDownload"));

					var data = $(result).find("#divDownload");  // download data
					var links = $(data[0]).find("a");
					// console.log(links);
					
					$.each(links, function(index, el) {
						// console.log(el);
						if (videoQuality == $(el).html()){
							long_url = $(el).attr('href');
							console.log('Episode ' + (episodeLinks.length - i));
							console.log(long_url);
						}
					});
                  },
         async:   false, 
		 script:  true
    });       
}
