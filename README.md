# Kissanime batch links generator

Adapted from https://github.com/Vergo777/Kissanime-LinkDownload

A lot of thanks to [@Vergo777](https://github.com/Vergo777) for your great work.


## How to use the script 

Go to an anime page on KissAnime (eg http://kissanime.ru/Anime/Haikyuu), then open JavaScript console and run 

```js
$.getScript("https://rawgit.com/aviaryan/Kissanime-LinkDownload/master/kissanime.js")
```


## Description and usage instructions

If you're a free user on Kissanime and want to download multiple episodes at once, you'd usually have to visit each episode page individually one by one and get the download link again and again 

This app avoids that by basically allowing you to simply go to the main anime page, run the script and automatically get direct download links for all the episodes 

The detailed steps to use this script are as follows - 

##1. Login to Kissanime using your account (make one if needed) 

##2. Go to the main page of the anime you want to download (e.g. Wake up Girls) 

![Screenshot](https://a.pomf.se/udpztv.png)

##3. Press F12 and click on the console tab 

![Screenshot](https://a.pomf.se/sndhdw.png)

##4. Paste the following into the console window and press enter 

$.getScript("https://rawgit.com/Vergo777/Kissanime-LinkDownload/master/kissanime.js")

![Screenshot](https://a.pomf.se/svfhlk.png)

##5. Enter the episode number from which you'd like to start generating download links (e.g. ep 3)  

![Screenshot](https://a.pomf.se/rsuhqo.png)

##6. Enter the final episode number till which you'd like to generate download links (e.g. ep 9)  

![Screenshot](https://a.pomf.se/iefobt.png)

##7. Enter the video quality you'd like to get. This can be found on any episode page. (e.g. 1280x720.mp4)  

![Screenshot](https://a.pomf.se/hqvfvo.png)

![Screenshot](https://a.pomf.se/bdjswc.png)

##8. Wait till all links are generated, and then copy them from the console window! 

![Screenshot](https://a.pomf.se/kpejyt.png)

Once you copy these links you can use something like Internet Download Manager to queue them all up at once and start batch downloading


## Downloading the links

Use [aria2](https://aria2.github.io). 

```
aria2c -i file_with_links.txt
```

