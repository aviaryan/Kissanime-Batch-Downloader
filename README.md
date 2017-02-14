# Kissanime batch links generator

Script that fetches download links of an Anime series on KissAnime and gives them to you in the form of a list. 
Once you have the list; use IDM, DownThemAll, wget or aria2c to download the anime series.

Before fetching the links, you can choose the starting episode, the ending episode and the resolution preference order for downloads. 

Having problems with script? Maybe it's an issue with KissAnime. See [#3](https://github.com/aviaryan/Kissanime-Batch-Downloader/issues/3). 
If it's something else, please [open an issue](https://github.com/aviaryan/Kissanime-Batch-Downloader/issues/new)

------

Forked from https://github.com/Vergo777/Kissanime-LinkDownload. That project was outdated and un-maintained so I decided to continue it. So thank you [@Vergo777](https://github.com/Vergo777).

**Before using the script, read [TERMS OF USING](TERMS-OF-USING.md).**


## How to use the script 

Go to an anime page on KissAnime (eg http://kissanime.ru/Anime/Haikyuu), then open JavaScript console and run 

```js
$.getScript("https://rawgit.com/aviaryan/Kissanime-Batch-Downloader/master/kissanime.js")
```


## Detailed instructions

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

* Wait till all links are generated.

![screen shot 2017-02-09 at 1 50 29 pm](https://cloud.githubusercontent.com/assets/4047597/22774908/4674300a-eecf-11e6-8ec7-02124461fb00.jpg)

* Once the process is completed, a window will open with the list of links.

![screen shot 2017-02-09 at 1 51 16 pm](https://cloud.githubusercontent.com/assets/4047597/22774909/472f4034-eecf-11e6-8cbc-26e935bcca47.jpg)

Once you copy these links you can use something like Internet Download Manager to queue them all up at once and start batch downloading.


## Downloading links through command line

Use [aria2](https://aria2.github.io). It is a cross-platform application available on Mac, Linux and Windows.

```
aria2c -i file_with_links.txt
```

You can also use [aria2_helper.sh](aria2_helper.sh) for a better downloading experience.



## Working around with Captchas

At times, KissAnime blocks users from fetching multiple episodes using a Captcha. 
When this script detects a captcha, it shows a prompt and thereby pauses its execution.
Then you will be given a link of the page with the captcha.
Go to that link in a new tab and solve the captcha. 
Once solved, come back to the anime list and click on OK in the prompt to resume the script.
