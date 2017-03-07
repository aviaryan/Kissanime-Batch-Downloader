# KissAnime, KissAsian, KissCartoon batch links generator

Scripts that fetch download links of any series on KissAnime, KissAsian or KissCartoon and gives them to you in the form of a list. 
Once you have the list; use IDM, DownThemAll, wget or aria2c to download the series.

Before fetching the links, you can choose the starting episode, the ending episode, the resolution preference order for downloads and the [output format of links](#opf). 

Having problems with script? See [FAQ](#faq). 
If problem is not solved, please [open an issue](https://github.com/aviaryan/Kissanime-Batch-Downloader/issues/new).

> Forked from https://github.com/Vergo777/Kissanime-LinkDownload. That project was outdated and un-maintained so I decided to continue it. So thank you [@Vergo777](https://github.com/Vergo777).

**Before using the script, read [TERMS OF USING](TERMS-OF-USING.md).**

**You need to login into KissXXXX website before using the script.**



## How to use the script 

Go to an anime page on KissAnime (eg http://kissanime.ru/Anime/Haikyuu), then open JavaScript console and run 

```js
$.getScript("https://rawgit.com/aviaryan/Kissanime-Batch-Downloader/master/kissanime.js")
```

For cartoons, go to a cartoon page on KissCartoon (eg http://kisscartoon.se/Cartoon/Shimmer-and-Shine-Season-2), then open JavaScript console and run

```js
$.getScript("https://rawgit.com/aviaryan/Kissanime-Batch-Downloader/master/kisscartoon.js")
```

For KissAsian, go to a series listing page (eg http://kissasian.com/Drama/My-Bromance-The-Series), then open JavaScript console and run

```js
$.getScript("https://rawgit.com/aviaryan/Kissanime-Batch-Downloader/master/kissasian.js")
// BUG
// getScript may not work on KissAsian. Don't worry, that's not a problem. You will have to manually copy the code. See FAQ below.
```



## Detailed instructions (taking KissAnime)

**These instructions are for KissAnime. Similar instructions go for KissCartoon and KissAsian.**


* Login to Kissanime using your account (make one if needed) 

* Go to the main page of the anime you want to download (e.g. [Haikyuu](http://kissanime.ru/Anime/Haikyuu)) 

![KissAnime Haikyuu](https://cloud.githubusercontent.com/assets/4047597/22774534/913bebf2-eecd-11e6-9e30-24e6f9c47481.jpg)

* Open JavaScript console from the Developer Options.

![JavaScript console](https://cloud.githubusercontent.com/assets/4047597/22774613/f6a56a22-eecd-11e6-9f56-aad2f80e948c.jpg)

* Paste the following into the console window and press enter 

```js
$.getScript("https://rawgit.com/aviaryan/Kissanime-Batch-Downloader/master/kissanime.js")
```

![Enter script](https://cloud.githubusercontent.com/assets/4047597/22774680/34679d1c-eece-11e6-9ebc-52d7c8dc66d8.jpg)

* Enter the episode number from which you'd like to start generating download links (e.g. ep 3)  

![Enter episode number](https://cloud.githubusercontent.com/assets/4047597/22774759/8e3e9b42-eece-11e6-99e0-7944f6d8a754.jpg)

* Enter the final episode number till which you'd like to generate download links (e.g. ep 9)  

* Enter your resolution preference. Eg > `720,480,360`

<a name="opf"></a>
* Enter the links output preference. `0` is for basic list of links (works with any basic download tool), `1` is for [list of links with episode names](#bdf) (suitable for wget, aria2c users), `2` is for HTML page with download links (suitable for [DownThemAll (Firefox)](#dta)). 

* Wait till all links are generated.

![screen shot 2017-02-09 at 1 50 29 pm](https://cloud.githubusercontent.com/assets/4047597/22774908/4674300a-eecf-11e6-8ec7-02124461fb00.jpg)

* Once the process is completed, the file with list of links will be downloaded or opened (depends on the browser).

![screen shot 2017-02-09 at 1 51 16 pm](https://cloud.githubusercontent.com/assets/4047597/22774909/472f4034-eecf-11e6-8cbc-26e935bcca47.jpg)

Now you can use any basic download tool to download all the episodes. There are some methods given below. I recommend the [DownThemAll method](#dta) (requires Firefox).


## Downloading links through command line

If you entered "0" in output preference, you will get a plain list of links.
You can use [aria2](https://aria2.github.io) to download them at once. It is a cross-platform application available on Mac, Linux and Windows.

```
aria2c -i file_with_links.txt
```

You can also use [aria2_basic_helper.sh](helpers/aria2_basic_helper.sh) for a better downloading experience.


<a name="bdf"></a>
## Better download filenames (command line)

Enter "1" in step 4 of script configuration to output episode links with filenames. These filenames are derived from episode names on KissXXXX website. 
You can use `wget` or `aria2c` to download the list of episodes with proper names. 
Note that you will have to use [aria2_helper.sh](helpers/aria2_helper.sh) or [wget_helper.sh](helpers/wget_helper.sh) for downloading that list.


## Working around with Captchas

At times, KissXXXX blocks users from fetching multiple episodes using a Captcha. 
When this script detects a captcha, it shows a prompt and thereby pauses its execution.
Then you will be given a link of the page with the captcha.
Go to that link in a new tab and solve the captcha. 
Once solved, come back to the anime list and click on OK in the prompt to resume the script.


<a name="dta"></a>
## Downloading with DownThemAll

[DownThemAll](https://addons.mozilla.org/en-US/firefox/addon/downthemall/) is a Firefox extension. 
Once you install it in Firefox, use "2" in output preference setting (4th when you start the script) to generate HTML page as output. 
That will give you a HTML page with direct links to all episodes. Now, open that page in Firefox and right click a blank location. 
Select "DownThemAll" from the menu to show a dialog with all urls in the page. Select all urls and **set the mask as `*text*`**. 
Then start the download. Now downloading will start with proper filenames.


## FAQ

### `$.getScript(...)` doesn't do anything ?

Maybe the script is being blocked. To bypass this, just copy the contents of the script and paste it in the Console. 
For example, if you had this problem with KissAsian, you take it's script which is 
https://rawgit.com/aviaryan/Kissanime-Batch-Downloader/master/kissasian.js
and open it in a new browser tab. Now you will be able to copy the script code. Just copy it and paste it in the KissAsian console. 


### Last link in my lists.txt won't download 

Try adding an empty line after the last link.


