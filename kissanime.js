// python -m http.server
// http://localhost:8000/kissanime.js

var URL = window.location.origin

var episodeLinks = $('table.listing a').map(function(i,el) { return $(el).attr('href'); });

$.ajaxSetup({async:false});
$.getScript("http://kissanime.com/Scripts/asp.js");

var login = "vergo777";
var api_key = "R_6a13f014b38f4f80a31cf7d80a7c18c7";
var long_url; 

var startEpisode; 
do {
	startEpisode = prompt("Enter episode number you want to start from");
	if(startEpisode <= 0 || startEpisode > episodeLinks.length) {
		alert("Episode number entered must be greater than 0 and lesser than total number of eps"); 
	} else {
		break; 
	}
} while(true); 

var endEpisode; 
do {
	endEpisode = prompt("Enter episode number you want to end at");
	if(endEpisode <= 0 || endEpisode > episodeLinks.length || endEpisode < startEpisode) {
		alert("Episode number entered must be greater than 0 and lesser than total number of eps");
	} else {
		break;
	}
} while(true); 
var videoQuality = prompt("Enter video quality you want to download. Example - '960x720.mp4' (without the quotes)"); 

var i; 
for (i = (episodeLinks.length - startEpisode); i >= (episodeLinks.length - endEpisode); i--) {
	jQuery.ajax({
         url:    URL + episodeLinks[i], 
         success: function(result) {
                    var $result = eval($(result));
					// var stringStart = result.search("var wra"); 
					// var stringEnd = result.search("document.write"); 
					// var javascriptToExecute = result.substring(stringStart, stringEnd);
					// eval(javascriptToExecute);
					
					console.log(result.search("Save link as"));
					console.log(result.search("divDownload"));

					var data = $(result).find("#divDownload");  // download data
					var links = $(data[0]).find("a");
					// console.log(links);
					
					// $("body").append('<div id="episode' + i + '" style="display: none;"></div>')
					// $('#episode' + i).append(wra);
					
					// var downloadQualityOptions = $('#episode' + i + ' a').map(function(i,el) { return $(el); });
					$.each(links, function(i, el) {
						console.log(el);
						if (videoQuality == $(el).html()){
							long_url = $(el).attr('href');
							console.log(long_url);
						}
					});

					var downloadQualityOptions = $(data).map(function(i,el) { return $(el); });
					var j;
					for(j = 0; j < downloadQualityOptions.length; j++) {
						// debug
						console.log(downloadQualityOptions[j].length());

						if(videoQuality === downloadQualityOptions[j].html()) {
							long_url = downloadQualityOptions[j].attr('href');
							console.log(i);
							console.log(long_url);
							// get_short_url(long_url, login, api_key);
						}
					}
                  },
         async:   false, 
		 script:  true
    });       
}


function get_short_url(long_url, login, api_key)
{
    $.getJSON(
        "http://api.bitly.com/v3/shorten?callback=?", 
        { 
            "format": "json",
            "apiKey": api_key,
            "login": login,
            "longUrl": long_url, 
			async: true
        },
        function(response)
        {
            console.log(response.data.url);
        }
    ); 
}
