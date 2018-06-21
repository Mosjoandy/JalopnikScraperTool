# Jalopnik Scraper Tool

## Overview

This is a full-stack app that takes the front page of Jalopnik. Upon clicking the large red "scraping" button, the user will be presented with all the front page article's title, hyperlink to the article, and a small excerpt. The user has an option to attach a note to the article they are interested in, which appears in the form of a popup. 

* * *

<img src="https://cdn.discordapp.com/attachments/446103300069392385/459486463684378652/unknown.png" width="480px">

## Process

Heroku Deployment: https://dry-castle-71302.herokuapp.com/

- When the user clicks on the large red button: "SCRAPE SOME ISH", a call will be made using Axios and Cheerio will then "scrape" from https://www.jalopnik.com/

<img src="https://cdn.discordapp.com/attachments/446103300069392385/459486933341700107/unknown.png" width="480px">

- The page will reload after scraping from the website, which will then populate the area below the main screen with articles.

<img src="https://cdn.discordapp.com/attachments/446103300069392385/459487324015951872/unknown.png" width="480px">

- Users are given the title with embedded hyperlink, excerpt, and a green button that will save notes on the article for later viewing.

<img src="https://cdn.discordapp.com/attachments/446103300069392385/459488037764726784/unknown.png" width="480px">

- When the user clicks save note, the modal will dynamically change, and the note will be saved in the database, associated by ID to the article.

<img src="https://cdn.discordapp.com/attachments/446103300069392385/459488246309847090/unknown.png" width="480px">

- If the user clicks the note button again, their note will appear.

<img src="https://cdn.discordapp.com/attachments/446103300069392385/459488526229045249/unknown.png" width="480px">

* * *

## Technology

- MongoDB v3.6 - [mongoDB](https://www.mongodb.com/)
- Heroku - [Heroku](https://www.heroku.com/)

### CDN's

- Bootstrap v4.1.0 - [get bootstrap](https://getbootstrap.com/)
- JQuery v3.3.1 - [JQuery](http://jquery.com/)

### NPM's

- axios v0.18.0 - [NPM axios](https://www.npmjs.com/package/axios)
- body-parser v1.18.3 - [NPM body-parser](https://www.npmjs.com/package/body-parser)
- cheerio v1.0.0-rc.2 - [NPM cheerio](https://www.npmjs.com/package/cheerio)
- express v4.16.3 - [NPM express](https://www.npmjs.com/package/express)
- mongoose v5.1.6 - [NPM mongoose](https://www.npmjs.com/package/mongoose)
- morgan v1.9.0 - [NPM morgan](https://www.npmjs.com/package/morgan)