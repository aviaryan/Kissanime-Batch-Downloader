// python -m http.server
// http://localhost:8000/kissanime.js

var URL = window.location.origin

var episodeLinks = $('table.listing a').map(function(i,el) { return $(el).attr('href'); });

$.ajaxSetup({async:false});
$.getScript("http://kissanime.com/Scripts/asp.js");

console.log('Starting Kissanime Batch Downloader script...');

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
	"Enter video quality you want to download. Example - '640x360.mp4' (without the quotes)", 
	defaultText="854x480.mp4"
);

var i;
var linkStr = "";

console.log('Starting to fetch links..');

for (i = (episodeLinks.length - startEpisode); i >= (episodeLinks.length - endEpisode); i--) {
	console.log('Fetching Episode ' + (episodeLinks.length - i));
	jQuery.ajax({
		url: URL + episodeLinks[i], 
		tryCount : 0,
		retryLimit : 3,
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
					linkStr += long_url + "\n";
					// console.log('Episode ' + (episodeLinks.length - i));
					console.log(long_url);
				}
			});
		},
		error: function(xhr, textStatus, errorThrown ) {
			console.log(textStatus)
			// http://stackoverflow.com/questions/10024469/whats-the-best-way-to-retry-an-ajax-request-on-failure-using-jquery
			this.tryCount++;
			if (this.tryCount <= this.retryLimit) {
				//try again
				console.log('Retrying..');
				$.ajax(this);
			}
			return;
		},
		async:   false, 
		script:  true
	});
}

// createGlotSnippet(linkStr)
console.log('Opening list of links')
download("links.txt", linkStr)


function createGlotSnippet(string){
	$.ajax({
		type: "POST",
		url: 'https://snippets.glot.io/snippets',
		data: {
			"language": "python", 
			"title": "download_links.txt", 
			"dataType": "json",
			"crossDomain": true,
			"public": true, 
			"files": [{"name": "list.txt", "content": string}]
		},
		success: function(data, textStatus, jqXHR){
			console.log(data)
		}
	});
}

// http://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
	// element.setAttribute('target', '_blank');
	// ^^ problems with safari

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}
