// python -m http.server
// http://localhost:8000/kissanime.js

// CONFIG
var siteName = "Kissasian"
var rootUrl = 'http://kissasian.com'
var URL = window.location.origin
// END CONFIG


var episodeLinks = $('table.listing a').map(function(i,el) { return $(el).attr('href'); });
var episodeNames = $('table.listing a').map(function(i,el) { return $.trim( $(el).html() ); });

$.ajaxSetup({async:false});
$.getScript(rootUrl + "/Scripts/asp.js");

// --------
// HACKS
var _0xea24 = ["\x6B\x72\x73\x6B\x31", "\x75\x68\x38\x61\x32\x44\x4E\x6A", "\x6B\x72\x73\x6B", "\x70\x73\x59\x73\x7A\x70\x33\x7A", "\x6B\x72\x73\x6B\x32", "\x7A\x75\x6E\x55\x76\x48\x33\x66"]; window[_0xea24[0]] = _0xea24[1]; window[_0xea24[2]] = _0xea24[3]; window[_0xea24[4]] = _0xea24[5]
var jsS = [
	"/Scripts/common.js",
	"/Scripts/aes.js",
	"/Scripts/sha256.min.js",
	"/Scripts/kissenc.min.js?v=2"
];
console.log('Loading scripts ...');
for (var i=0; i < jsS.length; i++){
	console.log(jsS[i]);
	$.getScript(rootUrl + jsS[i]);
}
// END HACKS
// ----------


console.log('Starting ' + siteName + ' Batch Downloader script...');

var startEpisode;
do {
	startEpisode = Number(prompt("Enter episode (listing) number you want to start from", defaultText="1"));
	if(startEpisode <= 0 || startEpisode > episodeLinks.length) {
		alert("Episode number entered must be greater than 0 and lesser than total number of eps"); 
	} else {
		break; 
	}
} while(true);

var endEpisode;
do {
	endEpisode = Number(prompt("Enter episode (listing) number you want to end at", defaultText="2"));
	if(endEpisode <= 0 || endEpisode > episodeLinks.length || endEpisode < startEpisode) {
		alert("Episode number entered must be greater than 0 and lesser than total number of eps");
	} else {
		break;
	}
} while(true);

var videoQuality = prompt(
	"Enter video quality preferences for the download. Example - '720,480'\nThis first looks for 720p, if 720 is not available, it picks 480.", 
	defaultText="720,480"
);

if (videoQuality == null){
	videoQuality = "720,480,360";
}

var i;
var linkStr = "";

console.log('Starting to fetch links..');

for (i = (episodeLinks.length - startEpisode); i >= (episodeLinks.length - endEpisode); i--) {
	console.log('Fetching listing ' + (episodeLinks.length - i) + ' [' + episodeNames[i] + ']');
	jQuery.ajax({
		url: URL + episodeLinks[i], 
		tryCount : 0,
		retryLimit : 3,
		success: function(result) {
			var $result = eval($(result));

			// dynamic javascript
			var stringStart = result.search("var wra");
			if (stringStart != -1){
				var stringEnd = result.search("document.write"); 
				var javascriptToExecute = result.substring(stringStart, stringEnd);
				// console.log(javascriptToExecute)
				eval(javascriptToExecute);
				// console.log(wra);
			}
			// end dynamic javascript

			var data = $(result).find("#divDownload");  // download data

			if (data == null || data == "" || data.length == 0){ // captcha maybe
				console.log("Captcha detected at " + URL + episodeLinks[i]);
				prompt("Captcha detected. Solve it by opening the link below in a new tab. After solving, press OK.",
					defaultText=URL + episodeLinks[i]);
				this.tryCount++;
				$.ajax(this);  // retry
				return;
			}

			// after above as dont want many episodeN divs
			$("body").append('<div id="episode' + i + '" style="display: none;"></div>')
			$('#episode' + i).append(wra);
			var links = $('#episode' + i).find("a");
			// console.log(links);
			
			var quals = videoQuality.split(',');
			var found = false;
			// pick download
			for (var j=0; j<quals.length; j++){
				// check if the format exists or not
				if (found)
					return;

				$.each(links, function(index, el) {
					// console.log(el);
					if ( $(el).html().search(quals[j]) > -1 ){
						long_url = $(el).attr('href');
						linkStr += long_url + "\n";
						found = true;
						// console.log('Episode ' + (episodeLinks.length - i));
						console.log(long_url);
					}
				});
			}
			// successful response processed
		},
		error: function(xhr, textStatus, errorThrown ) {
			console.log(textStatus)
			// http://stackoverflow.com/questions/10024469/
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

console.log('Opening list of links')
download("links.txt", linkStr)

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


function sleep(miliseconds) {
	var currentTime = new Date().getTime();
	while (currentTime + miliseconds >= new Date().getTime()) {
	}
}
