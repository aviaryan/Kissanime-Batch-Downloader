# Kissanime batch links generator

Adapted from https://github.com/Vergo777/Kissanime-LinkDownload

A lot of thanks to [@Vergo777](https://github.com/Vergo777) for your great work.


## How to use the script 

Go to an anime page on KissAnime (eg http://kissanime.ru/Anime/Haikyuu), then open JavaScript console and run 

```js
$.getScript("https://rawgit.com/aviaryan/Kissanime-Batch-Downloader/master/kissanime.js")
```


## Description and usage instructions

* Login to Kissanime using your account (make one if needed) 

* Go to the main page of the anime you want to download (e.g. [Haikyuu](http://kissanime.ru/Anime/Haikyuu)) 

![Screenshot](https://a.pomf.se/udpztv.png)

* Open JavaScript console from the Developer Options.

![Screenshot](https://a.pomf.se/sndhdw.png)

* Paste the following into the console window and press enter 

```js
$.getScript("https://rawgit.com/aviaryan/Kissanime-Batch-Downloader/master/kissanime.js")
```

![Screenshot](https://a.pomf.se/svfhlk.png)

* Enter the episode number from which you'd like to start generating download links (e.g. ep 3)  

![Screenshot](https://a.pomf.se/rsuhqo.png)

* Enter the final episode number till which you'd like to generate download links (e.g. ep 9)  

![Screenshot](https://a.pomf.se/iefobt.png)

* Enter the video quality you'd like to get. This can be found on any episode page. (e.g. 1280x720.mp4)  

![Screenshot](https://a.pomf.se/hqvfvo.png)

![Screenshot](https://a.pomf.se/bdjswc.png)

* Wait till all links are generated.

![Screenshot](https://a.pomf.se/kpejyt.png)

* Once the process is completed, a window will open with the list of links.


Once you copy these links you can use something like Internet Download Manager to queue them all up at once and start batch downloading.


## Downloading the links in Linux/Mac

Use [aria2](https://aria2.github.io). 

```
aria2c -i file_with_links.txt
```

